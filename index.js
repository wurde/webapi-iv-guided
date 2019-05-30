'use strict'

/**
 * Dependencies
 */

const express = require('express')
const helmet = require('helmet')
const db = require('./data/db.js')

/**
 * Constants
 */

const port = (process.env.PORT || 4000)

/**
 * Define app
 */

const app = express()

/**
 * Middleware
 */

app.use(helmet())
app.use(express.json())

/**
 * Routes
 */

app.get('/', async (req, res) => {
  try {
    const shoutouts = await db('shoutouts')
    res.status(200).json(shoutouts)
  } catch (error) {
    console.error('\nERROR', error)
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' })
  }
})

app.post('/', async (req, res) => {
  try {
    const [id] = await db('shoutouts').insert(req.body)
    const shoutouts = await db('shoutouts')

    res.status(201).json(shoutouts)
  } catch (error) {
    console.error('\nERROR', error)
    res.status(500).json({ error: 'Cannot add the shoutout' })
  }
})

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express running on port ${port}`)
  })
}

/**
 * Export app
 */

module.exports = app
