import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders the blog title and author, but not url and likes', () => {
    const blog = {
        title: 'The blog title is rendered by default',
        author: 'The author is included too',
        url: 'noshowurl.org',
        likes: 2,
        user: {
            username: 'KK'
        }
    }

    const mockLikeHandler = jest.fn()
    const mockRemoveHandler = jest.fn()
    const mockUser = {
        username: 'mockUser'
    }

    const component = render(
        <Blog
            blog={blog}
            likeBlog={mockLikeHandler}
            user={mockUser}
            removeBlog={mockRemoveHandler}
        />
    )

    const basicInfo = component.container.querySelector('.basicInfo')
    const fullInfo = component.container.querySelector('.fullInfo')

    expect(basicInfo).not.toHaveStyle('display: none')
    expect(basicInfo).toHaveTextContent(
        'The blog title is rendered by default'
    )
    expect(basicInfo).toHaveTextContent(
        'The author is included too'
    )
    expect(basicInfo).not.toHaveTextContent(
        'noshowurl.org'
    )
    expect(basicInfo).not.toHaveTextContent(
        'likes'
    )

    expect(fullInfo).toHaveStyle('display: none')

})