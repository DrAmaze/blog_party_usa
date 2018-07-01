require('dotenv').config({ path: './variables.env' });
let express = require('express');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index', {}));

app.listen(process.env.PORT, () =>
  console.log(`i am listening on ${process.env.PORT}`)
);
