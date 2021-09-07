const express = require("express");
const app = express();
const port = 3000;
const deskState = { 1: false, 2: false, 3: true, 4: true, 5: false };


app.use(express.static('public'))
//{deskid: req.params.deskId}
app.get("/api/desk/:deskId", (req, res) => {
  const deskStateJson = deskState[req.params.deskId];
  if (typeof deskStateJson === "undefined") {
    res.status(404).send("deze desk bestaat niet");
    return;
  }
  res.send({
    deskid: req.params.deskId,
    deskState:
      typeof deskStateJson === "undefined" ? "undifined" : deskStateJson,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
