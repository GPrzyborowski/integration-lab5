import { Request, Response } from 'express'
import pool from '../db'

type User = {
	name: string
	email: string
}

export const getUsers = async (req: Request, res: Response) => {
	try {
		const result = await pool.query('SELECT * FROM users')
		return res.status(200).json(result.rows)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Database error.' })
	}
}

export const newUser = async (req: Request<{}, {}, User>, res: Response) => {
	const { name, email } = req.body
	if (!name || !email) {
		return res.status(400).json({ message: 'Missing data.' })
	}
	try {
		const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
		return res.status(201).json({ message: 'New user registered successfully.', user: result.rows[0] })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Database error.' })
	}
}
