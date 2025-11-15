import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import PostForm from './PostForm'

describe('<PostForm />', () => {
  test('create new post and receive correct data', async () => {
    const createPost = vi.fn()

    render(<PostForm user={{ name: 'test user' }} createPost={createPost} />)

    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('title', { exact: false })
    const urlInput = screen.getByLabelText('url', { exact: false })
    const submitBtn = screen.getByRole('button', { name: 'create' })

    await user.type(titleInput, 'test input title')
    await user.type(urlInput, 'test input url')
    await user.click(submitBtn)

    expect(createPost.mock.calls).toHaveLength(1)
    expect(createPost.mock.calls[0][0].title).toBe('test input title')
    expect(createPost.mock.calls[0][0].url).toBe('test input url')
  })
})