import express from 'express'
import { getLoans, returnLoan, newLoan } from '../controllers/loans.controller'

const router = express.Router()

router.get('/get-loans', getLoans)
router.put('/end-loan/:id', returnLoan)
router.post('/new-loan', newLoan)

export default router
