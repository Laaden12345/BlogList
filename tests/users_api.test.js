const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const api = supertest(app)

const User = require('../models/user')



describe('When there is one initial User', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creating user succeeds with a unique username', async () => {
    const initialUsers = await helper.getUsers()

    const newUser = {
      username: 'laaden',
      name: 'Lassi Knuuttila',
      password: 'salis',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsers()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const initialUsers = await helper.getUsers()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salasana',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.getUsers()
  expect(usersAtEnd).toHaveLength(initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})