const path = require("path");
const express = require("express");
const app = express();
const port = 8080;




app.use(express.static(path.join(__dirname,"client")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname,"client/index.html"));
});  

app.post("createReminder/", (req, res) => {
  console.log(req.body);
});

app.listen(port,() => {
  console.log(`server started on port ${port}.`);
});