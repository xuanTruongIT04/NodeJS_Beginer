const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = 3000
const handlebars = require("express-handlebars")

app.use(morgan('combined'))

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
});

// app.get('/', (req,  res) => {
//   return res.send('Hello World!')
// })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})