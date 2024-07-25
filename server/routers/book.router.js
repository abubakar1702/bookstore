import express from "express";
import {
  allbooks,
  addBooks,
  genres,
  authors,
  addBookGenres,
  addAuthor,
  addGenres,
  editBook,
  getBookGenres,
  latestBooks,
  singleBook,
  booksByAuthor,
  discountBooks,
  authorProfile,
} from "../controllers/book.controller.js";
const router = express.Router();

router.get("/allbooks", allbooks);
router.post("/addbooks", addBooks);
router.post("/addauthor", addAuthor);
router.get("/genres", genres);
router.get("/authors", authors);
router.post("/addbookgenres", addBookGenres);
router.post("/addgenre", addGenres);
router.put("/editbook/:id", editBook);
router.get("/getbookgenres/:id", getBookGenres);
router.get("/latestbooks", latestBooks);
router.get("/singlebook/:id", singleBook);
router.get("/booksbyauthor",booksByAuthor);
router.get("/discountbooks", discountBooks)
router.get("/booksbyauthor/:id", booksByAuthor)
router.get("/author/:id", authorProfile)

export default router;
