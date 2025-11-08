import { useState } from "react"
import blogService from "../services/blogs"
import Notification from "./Notification"

const PostForm = ({ user, updateBlogListState }) => {
  const [postTitle, setPostTitle] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [notification, setNotification] = useState(null)

  const handleCreateForm = async (event) => {
    event.preventDefault()

    try {
      const postData = {
        title: postTitle,
        url: postUrl
      }
  
      const createdPost = await blogService.create(postData)
  
      updateBlogListState(createdPost)
  
      setPostTitle('')
      setPostUrl('')

      setNotification({
        message: `a new blog ${createdPost.title} by ${createdPost.author.name} added`,
        status: "ok"
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({
        message: "create post failed",
        status: "error"
      })
      setTimeout(() => {
        setNotification(null)
      })
    }
  }

  return (
    <div>
      <h2>create new</h2>

      <Notification notification={notification} />

      <form onSubmit={handleCreateForm}>
        <div>
          <label htmlFor="postTitle">title:</label>
          <input 
            type="text" 
            id="postTitle"
            value={postTitle}
            onChange={({target}) => setPostTitle(target.value)}
            />
        </div>

        <div>
          <label htmlFor="postAuthor">author:</label>
          <input 
            type="text" 
            id="postAuthor"
            value={user.name}
            disabled
            />
        </div>

        <div>
          <label htmlFor="postUrl">url:</label>
          <input 
            type="text" 
            id="postUrl"
            value={postUrl}
            onChange={({target}) => setPostUrl(target.value)}
            />
        </div> 
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default PostForm