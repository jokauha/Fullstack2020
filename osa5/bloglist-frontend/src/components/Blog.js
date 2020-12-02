import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, user, removeBlog }) => {
    const [fullInfo, setFullInfo] = useState(false)

    let removable = false

    let addedBy = ''
    if(blog.user) {
        if (blog.user.username === user.username) {
            removable = true
        }
        addedBy = blog.user.name
    }

    const hideFullInfo = { display: fullInfo ? 'none' : '' }
    const showFullInfo = { display: fullInfo ? '' : 'none' }

    const showRemove = { display: removable ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleFullInfo = () => {
        setFullInfo(!fullInfo)
    }

    return (
        <div style={blogStyle} className='blog'>
            <div style={hideFullInfo} className='basicInfo'>
                {blog.title} {blog.author}
                <button className='viewButton' onClick={toggleFullInfo}>view</button>
            </div>
            <div style={showFullInfo} className='fullInfo'>
                {blog.title} {blog.author}
                <button className='hideButton' onClick={toggleFullInfo}>hide</button>
                <p>{blog.url}</p>
                <p className='likes'>
                    likes {blog.likes}
                    <button onClick={likeBlog}>like</button>
                </p>
                <p>{addedBy}</p>
                <div style={showRemove}>
                    <button onClick={removeBlog}>remove</button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default Blog
