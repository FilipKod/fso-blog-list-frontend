import { useState } from 'react'

const PostForm = ({
  user,
  createPost ,
}) => {
  const [postTitle, setPostTitle] = useState('')
  const [postUrl, setPostUrl] = useState('')

  const handleCreateForm = async (event) => {
    event.preventDefault()

    createPost({
      title: postTitle,
      url: postUrl
    })

    setPostTitle('')
    setPostUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleCreateForm}>
        <div>
          <label htmlFor="postTitle">title:</label>
          <input
            type="text"
            id="postTitle"
            value={postTitle}
            onChange={({ target }) => setPostTitle(target.value)}
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
            onChange={({ target }) => setPostUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default PostForm