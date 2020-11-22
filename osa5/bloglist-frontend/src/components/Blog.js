import React, {useState} from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [fullInfo, setFullInfo] = useState(false)

  const hideFullInfo = { display: fullInfo ? 'none' : '' }
  const showFullInfo = { display: fullInfo ? '' : 'none' }

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
      </div>
    </div>
  )
}

export default Blog
