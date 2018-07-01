require('dotenv').config({ path: './variables.env' });
let express = require('express');
const app = express();
console.log(process.env.PORT)
app.get('/', (req, res) => res.end('hey what is good brahhhhhlean?'));

app.listen(process.env.PORT, () =>
  console.log(`i am listening on ${process.env.PORT}`)
);
