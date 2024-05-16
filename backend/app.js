const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    name: "",
    email: "",
    phone: "",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Node Server");
});

// Data get method
app.get("/user", (req, res) => {
  const search = req.query.search;
  if (search) {
    const searchResult = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(searchResult);
  } else {
    res.send(users);
  }
});

//Daynamic data get method
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id];
  res.send(user);
});

// Data POST method
app.post("/user", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length;
  users.push(newUser);
  res.json(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
