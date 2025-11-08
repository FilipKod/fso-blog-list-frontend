import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )  
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const user = await loginService.login({username, password})
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
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
            type='text' 
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  return (
    <div>
      {!user && loginForm()}
      
      <h2>blogs</h2>

      {user && (
        <div>
          <p>
            {user.name} logged in
          </p>
        </div>
      )}

      {blogs.length && blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App