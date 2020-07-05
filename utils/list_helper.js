const _ = require('lodash')

const dummy = (blogs) =>{
  return 1
}

const totalLikes = (blogs) =>{
  return blogs.map(blog =>{
    return blog.likes ? blog.likes : 0
  }).reduce((sum, item) =>{
    return sum + item
  }, 0)
}

const favoriteBlog = (blogs) =>{
  if ( blogs.length > 0 ) {
    let favorite = blogs[0]
    blogs.forEach(blog =>{
      if ( blog.likes > favorite.likes ) {
        favorite = blog
      }
    })
    return favorite
  }
}

const mostBlogs = (blogs) =>{
  let grouped = _.groupBy(blogs, 'author')

  let mostAmount = -1
  let most = ''
  _.forEach(grouped, (author) =>{
    if ( author.length > mostAmount ) {
      mostAmount = author.length
      most = author[0].author
    }

  })

  return {
    'author': most,
    'blogs': mostAmount
  }
}

module.exports ={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}