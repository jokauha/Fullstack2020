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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}