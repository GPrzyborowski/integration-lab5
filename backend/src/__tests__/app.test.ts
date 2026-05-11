import app from '../app'
import request from 'supertest'
import pool from '../db'

jest.mock('../db', () => ({
	query: jest.fn(),
}))

describe('Endpoints', () => {
	test('get /health should return "ok"', async () => {
		const res = await request(app).get('/health')
		expect(res.status).toBe(200)
		expect(res.text).toBe('Celowo zepsuty test w ramach zadania "Konfiguracja GitHub Actions CI')
	})
	test('GET /ready should return books', async () => {
		;(pool.query as jest.Mock).mockResolvedValue({
			rows: [
				{
					id: 1,
					title: 'Test book',
				},
			],
		})
		const res = await request(app).get('/ready')
		expect(res.status).toBe(200)
		expect(res.body).toEqual([
			{
				id: 1,
				title: 'Test book',
			},
		])
		expect(pool.query).toHaveBeenCalled()
	})
	test('post /api/new-book should return 400 when data is missing', async () => {
		const res = await request(app).post('/api/new-book').send({
			title: '',
			author: '',
		})
		expect(res.status).toBe(400)
		expect(res.body).toEqual({
			error: 'Missing data.',
		})
	})
	test('post /api/new-user should create new user', async () => {
		;(pool.query as jest.Mock).mockResolvedValue({
			rows: [
				{
					id: 1,
					name: 'Gabriel Przyborowski',
					email: 'gprzyborowski@test.com',
				},
			],
		})
		const res = await request(app).post('/api/new-user').send({
			name: 'Gabriel Przyborowski',
			email: 'gprzyborowski@test.com',
		})
		expect(res.status).toBe(201)
		expect(res.body).toEqual({
			message: 'New user registered successfully.',
			user: {
				id: 1,
				name: 'Gabriel Przyborowski',
				email: 'gprzyborowski@test.com',
			},
		})
		expect(pool.query).toHaveBeenCalled()
	})
	test('post /api/new-loan should call database with correct values', async () => {
		;(pool.query as jest.Mock).mockResolvedValue({
			rows: [
				{
					id: 1,
					book_id: 2,
					user_id: 3,
				},
			],
		})
		const res = await request(app).post('/api/new-loan').send({
			bookId: 2,
			borrowerId: 3,
		})
		expect(res.status).toBe(201)
		expect(pool.query).toHaveBeenCalledWith(
			'INSERT INTO loans (book_id, user_id, loan_date) VALUES ($1, $2, $3) RETURNING *',
			expect.any(Array),
		)
	})
})
