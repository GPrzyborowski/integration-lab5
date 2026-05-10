import { Request, Response } from 'express'
import pool from '../db'

type Loan = {
	bookId: number
	borrowerId: number
	date: string
}

export const getLoans = async (req: Request, res: Response) => {
	try {
		const result = await pool.query(
			'SELECT l.id AS id, b.title, u.name, l.loan_date, l.return_date FROM loans l JOIN books b ON l.book_id = b.id JOIN users u ON l.user_id = u.id ORDER BY l.id DESC',
		)
		return res.status(200).json(result.rows)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Database error.' })
	}
}

export const returnLoan = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
	const { id } = req.params
	if (!id) {
		return res.status(400).json({ message: 'Missing data.' })
	}
	const idParsed = Number(id)
	try {
		await pool.query('UPDATE loans SET return_date = $1 WHERE id = $2 RETURNING *', [new Date(), idParsed])
		return res.status(200).json({ message: 'Loan ended successfully.' })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Database error.' })
	}
}

export const newLoan = async (req: Request<{}, {}, Loan>, res: Response) => {
	const { bookId, borrowerId } = req.body
	if (!bookId || !borrowerId) {
		return res.status(400).json({ message: 'Missing data.' })
	}
	try {
		const result = await pool.query('INSERT INTO loans (book_id, user_id, loan_date) VALUES ($1, $2, $3) RETURNING *', [
			bookId,
			borrowerId,
			new Date(),
		])
		return res.status(201).json({ message: 'New loan registered successfully.', loan: result.rows[0] })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Database error.' })
	}
}
