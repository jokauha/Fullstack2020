import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    title: <input id='title' value={newTitle} onChange={handleTitleChange} />
                </div>
                <div>
                    author: <input id='author' value={newAuthor} onChange={handleAuthorChange} />
                </div>
                <div>
                    url: <input id='url' value={newUrl} onChange={handleUrlChange} />
                </div>
                <div>
                    <button id='create' type='submit'>create</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm