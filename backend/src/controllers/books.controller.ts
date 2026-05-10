import { Request, Response } from 'express'
import pool from '../db'

type Book = {
	title: string
	author: string
}

export const getBooks = async (req: Request, res: Response) => {
	try {
		const result = await pool.query('SELECT * FROM books')
		return res.status(200).json(result.rows)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Database error.' })
	}
}

export const newBook = async (req: Request<{}, {}, Book>, res: Response) => {
	const { title, author } = req.body
	if (!title || !author || !title.trim() || !author.trim()) {
		return res.status(400).json({ error: 'Missing data.' })
	}
	const titleFormatted = title.trim()
	const authorFormatted = author.trim()
	try {
		const result = await pool.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [
			titleFormatted,
			authorFormatted,
		])
		return res.status(201).json({ message: 'New book registered successfully.', book: result.rows[0] })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Database error.' })
	}
}
export const deleteBook = async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params
	const parsedId = Number(id)

	if (isNaN(parsedId)) {
		return res.status(400).json({ message: 'Invalid book id.' })
	}

	try {
		const activeBookLoans = await pool.query('SELECT * FROM loans WHERE (book_id=$1 AND return_date IS NULL)', [
			parsedId,
		])
		if ((activeBookLoans.rowCount ?? 0) > 0) {
			return res.status(400).json({ message: 'This book has active loans.' })
		}
		await pool.query('DELETE FROM loans WHERE book_id=$1', [parsedId])
		const result = await pool.query('DELETE FROM books WHERE id=$1 RETURNING *', [parsedId])
		if (result.rowCount === 0) {
			return res.status(404).json({ error: 'Book not found.' })
		}
		return res.status(200).json({
			message: 'The book was successfully deleted.',
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Database error.' })
	}
}
