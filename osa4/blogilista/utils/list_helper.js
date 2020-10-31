const dummy = (blogs) => {
    if(blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map( blog => blog.likes )
    const reducer = (acc, cur) => acc + cur

    return likesArray.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}