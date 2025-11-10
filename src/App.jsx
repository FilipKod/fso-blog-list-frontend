import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import PostForm from './components/PostForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const newPostRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const userStorage = window.localStorage.getItem('loggedAppUser')
    if (userStorage) {
      const user = JSON.parse(userStorage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>

      <Notification notification={notification} />

      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  const updateBlogList = async (postObj) => {
    try {
      const createdPost = await blogService.create(postObj)

      setBlogs(blogs.concat(createdPost))

      newPostRef.current.toggleVisible()

      setNotification({
        message: `a new blog ${createdPost.title} by ${createdPost.author.name} added`,
        status: 'ok'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({
        message: 'create post failed',
        status: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      })
    }

  }

  const handleLikeButton = async (blog) => {
    const postObj = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedPost = await blogService.update(postObj)

    setBlogs(blogs.map(post => post.id === updatedPost.id ? updatedPost : post))
  }

  const handleRemoveButton = async (blog) => {

    const confirmed = confirm(`Remove blog ${blog.title} by ${blog.author.name}`)

    if (confirmed) {
      await blogService.remove(blog.id)

      setBlogs(blogs.filter(p => p.id !== blog.id))

      setNotification({
        message: `post ${blog.title} removed`,
        status: 'ok'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!user && loginForm()}

      <h2>blogs</h2>

      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}

      {user && (
        <>
          <Notification notification={notification} />
          <Togglable buttonLabel={'create new blog'} ref={newPostRef}>
            <PostForm
              user={user}
              createPost={updateBlogList}
            />
          </Togglable>
        </>
      )}

      {blogs.length && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike={handleLikeButton}
          onRemove={handleRemoveButton}
        />
      )}
    </div>
  )
}

export default App