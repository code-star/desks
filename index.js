const express = require('express')
const app = express()
const port = 3000

app.get('/', 
(req, res) => {res.send('Hello World!')})

//{deskid: req.params.deskId}
app.get('/api/desk/:deskId', 
(req, res) => {res.send({deskid: req.params.deskId})})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})