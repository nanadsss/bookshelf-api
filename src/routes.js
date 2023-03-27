/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */

const { addBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require("./handler");

/* eslint-disable linebreak-style */
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {
            return 'Homepage';
        },
    },
    {
        method: 'POST',
        path: '/book',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/book',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/book(bookId)',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/book(bookId)',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;