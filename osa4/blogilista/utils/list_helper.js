const lodash = require('lodash')

const dummy = (blogs) => {
    if(blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    const reducer = (acc, cur) => acc + cur
    const likesArray = blogs.map( blog => blog.likes )

    return likesArray.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likesArray = blogs.map( blog => blog.likes )
    const maxLikes = Math.max.apply(Math, likesArray)
    const favoriteBlog = blogs[likesArray.indexOf(maxLikes)]
    const returnInfo = (({ title, author, likes }) => ({ title, author, likes }))(favoriteBlog)
    return returnInfo
}

const mostBlogs = (blogs) => {
    const mostBlogsAuthor = lodash.maxBy(blogs, 'author')
    const numberOfBlogs = lodash.countBy(blogs, 'author')
    const returnInfo = {
        author: mostBlogsAuthor.author,
        blogs: numberOfBlogs[mostBlogsAuthor.author]
    }
    return returnInfo
}

const mostLikes = (blogs) => {
    const uniqueAuthors = lodash.uniqBy(blogs, 'author')
    var likesByAuthor = []
    uniqueAuthors.forEach(authorObject => {
        const blogsOfAuthor = blogs.filter( blog => blog.author === authorObject.author)
        const authorAndLikes = {
            author: authorObject.author,
            likes: lodash.sumBy(blogsOfAuthor, 'likes')
        }
        likesByAuthor.push(authorAndLikes)
    })
    const mostLikesAuthor = lodash.maxBy(likesByAuthor, 'likes')
    return mostLikesAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}