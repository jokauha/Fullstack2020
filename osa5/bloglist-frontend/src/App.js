import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()

        try {
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            setNotificationMessage(
                `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
            )
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        } catch (exception) {
            setIsError(true)
            setNotificationMessage(
                `the new blog could not be added: ${exception}`
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setIsError(false)
            }, 5000)
        }
    }

    const deleteBlog = async (id, title, author) => {
        if(window.confirm('Remove blog ' + title + ' by ' + author)) {
            try {
                await blogService.exterminate(id)
                setBlogs(blogs.filter(n => n.id !== id))
                setNotificationMessage(
                    `${title} by ${author} was deleted succesfully`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            } catch (exception) {
                setIsError(true)
                setNotificationMessage(
                    `${title} by ${author} could not be deleted`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                    setIsError(false)
                }, 5000)
            }
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotificationMessage(
                'Login succesful'
            )
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        } catch (exception) {
            setIsError(true)
            setNotificationMessage(
                'wrong username or password'
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setIsError(false)
            }, 5000)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken(null)
        setNotificationMessage(
            'logout succesful'
        )
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const addALike = async id => {
        const blog = blogs.find(n => n.id === id)
        const likedBlog = { ...blog, likes: blog.likes + 1 }

        try {
            const returnedBlog = await blogService.update(id, likedBlog)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        } catch (exception) {
            setIsError(true)
            setNotificationMessage(
                `Blog '${blog.title}' could not be liked: ${exception}`
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setIsError(false)
            }, 5000)
        }
    }

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    if (user === null) {
        return (
            <div>

                <Notification message={notificationMessage} isError={isError} />

                <h2>Login</h2>
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
        )
    } else {
        return (
            <div>

                <Notification message={notificationMessage} isError={isError} />

                <h2>blogs</h2>

                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <p>{user.name} logged in</p>
                    <button type='button' onClick={handleLogout}>logout</button>
                </div>
                <br></br>
                <div>
                    {blogForm()}
                </div>
                <br></br>
                <div>
                    {blogs
                        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                        .map(blog =>
                            <Blog
                                key={blog.id}
                                blog={blog}
                                likeBlog={() => addALike(blog.id)}
                                user={user}
                                removeBlog={() => deleteBlog(blog.id, blog.title, blog.author)}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default App