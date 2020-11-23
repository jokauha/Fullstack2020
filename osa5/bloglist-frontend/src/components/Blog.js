import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, user, removeBlog }) => {
    const [fullInfo, setFullInfo] = useState(false)

    let removable = false

    if (blog.user.username === user.username) {
        removable = true
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
        <div style={blogStyle}>
            <div style={hideFullInfo}>
                {blog.title} {blog.author}
                <button onClick={toggleFullInfo}>view</button>
            </div>
            <div style={showFullInfo}>
                {blog.title} {blog.author}
                <button onClick={toggleFullInfo}>hide</button>
                <p>{blog.url}</p>
                <p>
          likes {blog.likes}
                    <button onClick={likeBlog}>like</button>
                </p>
                <p>{blog.user.name}</p>
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
