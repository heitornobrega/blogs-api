const express = require('express');
const error = require('./middlewares/error');
const { userRouter } = require('./routers');

// ...

const app = express();

app.use(express.json());

app.use('/login', userRouter);

app.use(error);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
