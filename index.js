const express = require('express')
const app = express()
const port = 3000

app.get('/', 
(req, res) => {res.send('Hello World!')})
app.get('/api/desk/5', 
(req, res) => {res.send('test')})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})