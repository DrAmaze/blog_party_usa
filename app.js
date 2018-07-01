require('dotenv').config({ path: './variables.env' });
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'styles')));

app.get('/', (req, res) => res.render('index', {}));

app.listen(process.env.PORT, () =>
  console.log(`i am listening on ${process.env.PORT}`)
);
