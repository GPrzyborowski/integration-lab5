import express from 'express'
import { getBooks, newBook, deleteBook } from '../controllers/books.controller'

const router = express()

router.get("/get-books", getBooks)
router.post("/new-book", newBook)
router.delete("/delete-book/:id", deleteBook)

export default router