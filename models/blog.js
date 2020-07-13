const mongoose = require('mongoose')

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
    unique: false,
    minlength: 3
  },
  url: {
    type: String,
    unique: true
  },
  likes: Number,
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)