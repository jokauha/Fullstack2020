const listHelper = require('../utils/list_helper')
const blogList = require('./test_helper').initialBlogs

describe('the author with most blogs is', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('the author of the given blog, when the list only contains one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('correctly determined', () => {
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})