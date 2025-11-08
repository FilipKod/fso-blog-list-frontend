import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import PostForm from './components/PostForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
    event.preventDefault();
    
    try {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: "error"
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
            onChange={({target}) => setUsername(target.value)}
            />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input 
            id='password' 
            type='password' 
            value={password}
            onChange={({target}) => setPassword(target.value)}
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

  const updateBlogList = (createdPost) => {
    setBlogs(blogs.concat(createdPost))
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

      {user && <PostForm user={user} updateBlogListState={updateBlogList} />}

      {blogs.length && blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App