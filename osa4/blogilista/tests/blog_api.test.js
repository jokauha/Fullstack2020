const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('when there are initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).toContain('React patterns')
    })

    test('the field id is actually called id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    describe('adding a new blog', () => {
        test('a valid blog can be added', async () => {
            const newBlog = {
                title: 'Adding a new blog',
                author: 'Nelson Mandela',
                url: 'http://www.google.cat',
                likes: 5,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const contents = blogsAtEnd.map(r => r.title)
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
            expect(contents).toContain(newBlog.title)
        })

        test('if no likes are specified, the blog is to have 0 likes', async () => {
            const blogWithNoLikes = {
                title: 'Nobody likes me',
                author: 'Erkki Esimerkki',
                url: 'http://www.looserville.org',
            }

            await api
                .post('/api/blogs')
                .send(blogWithNoLikes)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const addedNoLikesBlog = blogsAtEnd.find(blog => blog.title === blogWithNoLikes.title)
            expect(addedNoLikesBlog.likes).toBe(0)
        })

        test('blog without title and url is not added', async () => {
            const newBlog = {
                author: 'Jane Doe'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 200 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )

            const contents = blogsAtEnd.map(r => r.title)

            expect(contents).not.toContain(blogToDelete.title)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})