const express = require("express");
const app = express();

const port = 5000 || process.env.PORT;

//Set EJS as template engine
app.set("view engine", "ejs");

//Handle values from index page
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get the index page
app.get("/", (req, res) => {
  res.render("index");
});

//POST request from index
//make HTTP call
//Send result back to index
app.post("/", (req, res) => {
  const api_key = "b323aa23f286ee3fa739734a62bbf508";
  let lower_city = req.body.city;
  let upper_city = lower_city.charAt(0).toUpperCase() + lower_city.substring(1);

  let url = `api.openweathermap.org/data/2.5/weather?q=${upper_city}&appid=${api_key}`;

  //Make API call to weather forecast
  fetch(
    `api.openweathermap.org/data/2.5/weather?q=${upper_city}&appid=${api_key}`
  )
    .then(res => res.json())
    .then(json => console.log(json));
});

app.listen(port, () => console.log(`App running on port ${port}`));
