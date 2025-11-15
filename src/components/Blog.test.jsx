import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import { describe } from 'vitest'
import Blog from './Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
  test('component render blog with only title and author', () => {
    const blog = {
      title: 'Test title',
      author: {
        name: 'test author',
        username: 'test username',
      },
      url: 'test url',
      likes: 21
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText(blog.title)
    expect(element).toBeDefined()

    const urlVisible = screen.queryByText(blog.url)
    expect(urlVisible).toBeNull()
  })
})