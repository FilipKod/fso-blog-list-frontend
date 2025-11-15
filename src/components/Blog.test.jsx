import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Blog from './Blog'

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

    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText(blog.title)
    expect(element).toBeDefined()

    const urlVisible = container.querySelector('#post-details')
    expect(urlVisible).toBeNull()
  })

  test('compontent show more details after clicking', async () => {
    const blog = {
      title: 'Test title',
      author: {
        name: 'test author',
        username: 'test username',
      },
      url: 'test url',
      likes: 21
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('#post-details')
    expect(div).toBeNull()

    const user = userEvent.setup()
    const btn = screen.getByRole('button', { name: 'view' })
    await user.click(btn)

    const divShow = container.querySelector('#post-details')
    expect(divShow).not.toBeNull()
  })

  test('like button is clicked twice', async () => {
    const blog = {
      title: 'Test title',
      author: {
        name: 'test author',
        username: 'test username',
      },
      url: 'test url',
      likes: 21
    }

    const onClickLike = vi.fn()

    render(<Blog blog={blog} onLike={onClickLike} />)

    const user = userEvent.setup()
    const viewBtn = screen.getByRole('button', { name: /view/i })
    await user.click(viewBtn)

    const likeBtn = screen.getByRole('button', { name: /like/i })
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(onClickLike.mock.calls).toHaveLength(2)
  })

  test('remove button is clicked', async () => {
    const blog = {
      title: 'Test title',
      author: {
        name: 'test author',
        username: 'test username',
      },
      url: 'test url',
      likes: 21
    }

    const onRemoveClick = vi.fn()

    render(<Blog blog={blog} onRemove={onRemoveClick} />)

    const user = userEvent.setup()
    const viewBtn = screen.getByRole('button', { name: 'view' })
    await user.click(viewBtn)

    const removeBtn = screen.getByRole('button', { name: 'remove' })
    await user.click(removeBtn)

    expect(onRemoveClick).toBeCalledTimes(1)
  })
})