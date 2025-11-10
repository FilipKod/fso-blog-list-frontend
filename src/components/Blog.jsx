import { useState } from "react"

const Blog = ({ blog, onLike }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="post">
      <span>
        {blog.title}
      </span>
      <button type="button" onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>
            <button type="button" onClick={() => onLike(blog)}>like</button>
          </div>
          <div>{blog.author.name}</div>
        </>
      )}
    </div>  
  )
}

export default Blog