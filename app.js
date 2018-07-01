require('dotenv').config({ path: './variables.env' });
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'styles')));

const blogFile = fs.readFileSync('./seeds/db.json', 'utf-8');
const blogArray = JSON.parse(blogFile);

app.get('/', (req, res) =>
  res.render('index', {
    blogs: blogArray
  })
);

app.listen(process.env.PORT, () =>
  console.log(`i am listening on ${process.env.PORT}`)
);
