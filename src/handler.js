/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
const books = require('./book');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    if (!name || name === '' || name === null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    if (pageCount < readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
};

const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    if (books.length === 0) {
        const response = h.response({
            status: 'success',
            data: {
                books: [],
            },
        });

        response.code(200);
        return response;
    }
    let filterBook = books;
    if (typeof name !== 'undefined') {
        filterBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (typeof reading !== 'undefined') {
        filterBook = books.filter((book) => Number(book.reading) === Number(reading));
    }
    if (typeof finished !== 'undefined') {
        filterBook = books.filter((book) => Number(book.finished) === Number(finished));
    }
    const listBook = filterBook.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }
    ));
    const response = h.response({
        status: 'success',
        data: {
            books: listBook,
        },
    }
    );
    response.code(200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((n) => n.id === bookId)[0];

    if (typeof book !== 'undefined') {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }
    );
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);
    if (typeof name === 'undefined') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }
        );
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }
        );
        response.code(400);
        return response;
    }
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
            response.code(404);
            return response;
};

module.exports = {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    editBookByIdHandler,
     deleteBookByIdHandler };