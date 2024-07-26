import mysql from 'mysql';
import db from "../config/db.js";

export const allbooks = (req, res) => {
  const query = `
        SELECT 
            b.id,
            b.title,
            a.name AS author,
            b.imageurl,
            b.description,
            b.pages,
            b.first_published,
            b.rating,
            b.price,
            b.language,
            b.isbn,
            b.format,
            b.discount,
            b.publication,
            b.publication_date,
            GROUP_CONCAT(g.genre_name SEPARATOR ', ') AS genres
        FROM 
            books AS b
        LEFT JOIN 
            authors AS a ON b.author_id = a.id
        LEFT JOIN 
            book_genres AS bg ON b.id = bg.book_id
        LEFT JOIN 
            genres AS g ON bg.genre_id = g.id
        GROUP BY 
            b.id
    `;

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

export const addBooks = (req, res) => {
  const {
    title,
    description,
    imageurl,
    pages,
    first_published,
    author_id,
    availability,
    rating,
    language,
    publication,
    price,
    isbn,
    publication_date,
    format,
    discount,
  } = req.body;

  if (!title || !description || !imageurl || !author_id || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query =
    "INSERT INTO books (title, description, imageurl, pages, first_published, author_id, availability, rating, language, publication, price, isbn, publication_date, format, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    title,
    description,
    imageurl,
    pages || null,
    first_published || null,
    author_id,
    availability,
    rating !== undefined ? rating : 0,
    language || null,
    publication || null,
    price,
    isbn || null,
    publication_date || null,
    format || null,
    discount || null,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting book:", err);
      return res.status(500).json({ error: "Failed to add book" });
    }
    console.log("Book added successfully:", result.insertId);
    return res
      .status(201)
      .json({ message: "Book added successfully", bookId: result.insertId });
  });
};

export const latestBooks = async (req, res) => {
  try {
    const query = `SELECT b.id, b.title, b.description,b.discount, a.name as author, b.imageurl, b.price, b.isbn, b.publication, b.first_published, b.rating, b.availability, b.publication_date, b.language
                   FROM books as b
                   JOIN authors as a
                   ON b.author_id = a.id
                   ORDER BY date_added DESC 
                   LIMIT 7;`;
    db.query(query, (err, data) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const singleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT b.id, b.title, b.description, a.name as author,b.author_id, a.imageurl as authorimage,a.date_of_birth as authordob,a.about as aboutauthor, b.imageurl, b.price, b.isbn, b.publication, b.first_published, b.rating, b.availability, b.publication_date, b.language,b.format,b.discount, GROUP_CONCAT(g.genre_name SEPARATOR ', ') as genres
      FROM books as b
      JOIN authors as a ON b.author_id = a.id
      LEFT JOIN book_genres as bg ON b.id = bg.book_id
      LEFT JOIN genres as g ON bg.genre_id = g.id
      WHERE b.id = ?
      GROUP BY b.id`;

    db.query(query, [id], (err, data) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (data.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      return res.json(data[0]);
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const genres = async (req, res) => {
  try {
    const allGenresQuery = `SELECT id, genre_name as name FROM genres`;
    db.query(allGenresQuery, (err, data) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const authors = async (req, res) => {
  try {
    const allGenresQuery = `SELECT * FROM authors`;
    db.query(allGenresQuery, (err, data) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBookGenres = async (req, res) => {
  try {
    const { book_id, genre_id } = req.body;
    if (!book_id || !genre_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `INSERT INTO book_genres(book_id, genre_id) VALUES(?,?)`;

    const values = [book_id, genre_id];
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting book:", err);
        return res.status(500).json({ error: "Failed to add book" });
      }
      return res
        .status(201)
        .json({ message: "Genre added successfully", bookId: result.insertId });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addAuthor = async (req, res) => {
  try {
    const { name, date_of_birth, imageurl, about } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const query = `INSERT INTO authors(name, date_of_birth, imageurl, about) VALUES(?,?,?,?)`;
    const values = [name, new Date(date_of_birth), imageurl, about];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting Author:", err);
        return res.status(500).json({ error: "Failed to add author" });
      }

      return res.status(201).json({
        message: "Author added successfully",
        authorId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error adding author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addGenres = async (req, res) => {
  try {
    const { genre_name } = req.body;
    if (!genre_name) {
      return res.status(400).json({ error: "Genre name is required" });
    }

    const query = `INSERT INTO genres(genre_name) VALUES(?)`;
    const values = [genre_name];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting genre:", err);
        return res.status(500).json({ error: "Failed to add genre" });
      }

      return res.status(201).json({
        message: "Genre added successfully",
        authorId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error adding genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookGenres = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT g.genre_name
      FROM genres AS g
      JOIN book_genres AS bg ON g.id = bg.genre_id
      WHERE bg.book_id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(results);
    });
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editBook = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    imageurl,
    pages,
    first_published,
    author_id,
    rating,
    language,
    publication,
    publication_date,
    price,
    isbn,
    availability,
  } = req.body;

  try {
    const findBookQuery = "SELECT * FROM books WHERE id = ?";
    db.query(findBookQuery, [id], (err, results) => {
      if (err) {
        console.error("Error finding book:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      const updateBookQuery = `
                UPDATE books
                SET 
                    title = ?,
                    description = ?,
                    imageurl = ?,
                    pages = ?,
                    first_published = ?,
                    author_id = ?,
                    rating = ?,
                    language = ?,
                    publication = ?,
                    publication_date = ?,
                    price = ?,
                    isbn = ?,
                    availability = ?
                WHERE id = ?
            `;
      const updateValues = [
        title,
        description,
        imageurl,
        pages,
        first_published,
        author_id,
        rating,
        language,
        publication,
        publication_date,
        price,
        isbn,
        availability,
        id,
      ];

      db.query(updateBookQuery, updateValues, (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating book:", updateErr);
          return res.status(500).json({ error: "Failed to update book" });
        }

        res.status(200).json({ message: "Book updated successfully" });
      });
    });
  } catch (error) {
    console.error("Error editing book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const discountBooks = (req, res) => {
  const query = `
    SELECT 
      b.id,
      b.title,
      a.name AS author,
      b.imageurl,
      b.description,
      b.pages,
      b.first_published,
      b.rating,
      b.price,
      b.language,
      b.isbn,
      b.format,
      b.discount,
      b.publication,
      b.publication_date,
      GROUP_CONCAT(g.genre_name SEPARATOR ', ') AS genres
    FROM 
      books AS b
    LEFT JOIN 
      authors AS a ON b.author_id = a.id
    LEFT JOIN 
      book_genres AS bg ON b.id = bg.book_id
    LEFT JOIN 
      genres AS g ON bg.genre_id = g.id
    WHERE 
      b.discount > 0  -- Filter books with discount
    GROUP BY 
      b.id
    ORDER BY 
      b.discount DESC
  `;

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

export const booksByAuthor = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT
      b.id,
      b.title,
      a.name AS author,
      b.author_id,
      b.imageurl,
      b.description,
      b.pages,
      b.first_published,
      b.rating,
      b.price,
      b.language,
      b.isbn,
      b.format,
      b.discount,
      b.publication,
      b.publication_date,
      GROUP_CONCAT(g.genre_name SEPARATOR ', ') AS genres
    FROM
      books AS b
      LEFT JOIN
        authors AS a ON b.author_id = a.id
      LEFT JOIN
        book_genres AS bg ON b.id = bg.book_id
      LEFT JOIN
        genres AS g ON bg.genre_id = g.id
    WHERE
      b.author_id = ?
    GROUP BY
      b.id
  `;

  db.query(query, [id], (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
};

export const authorProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT *
      FROM authors
      WHERE id = ?;
    `;

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Author not found" });
      }

      return res.json(results[0]);
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};