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
  let ordered = _.groupBy(blogs, 'author')
  console.log(_.reverse(ordered))

  _.forEach(ordered, (author) =>{
    console.log(author)

  })

  let amount = _.head(ordered)
  console.log(amount)

}

module.exports ={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}