const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  url: { type: String },
  likes: Number
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)