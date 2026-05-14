import express from 'express'
import cors from 'cors'
import pool from './db'
import loans from './routes/loans.routes'
import books from './routes/books.routes'
import users from './routes/users.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/health', (req, res) => {
	res.status(200).send('ok')
})

app.use('/ready', async (req, res) => {
	const data = await pool.query('SELECT * FROM books')
	res.send(data.rows)
})

app.use('/api', loans)
app.use('/api', books)
app.use('/api', users)

export default app
