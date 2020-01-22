const express = require("express");
const app = express();
const axios = require("axios");

const port = 5000 || process.env.PORT;
let weather_data = "";

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
app.post("/", async (req, res) => {
  try {
    const api_key = "b323aa23f286ee3fa739734a62bbf508";
    let weather_data = null;
    let lower_city = req.body.city;
    let upper_city =
      lower_city.charAt(0).toUpperCase() + lower_city.substring(1);

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${upper_city}&appid=${api_key}`;

    //Make API call to weather forecast
    let weather = await axios(url);
    weather_data = weather.data;

    //Render index page with data fetched from api
    let temp = `It is ${weather_data.main.temp} Fahrenheit in ${weather_data.name}`;
    let pressure = `Atmospheric pressure is ${weather_data.main.pressure}`;
    let humidity = `Humidity is ${weather_data.main.humidity}`;

    if (weather_data !== null) {
      res.render("results", {
        temp: temp,
        pressure: pressure,
        humidity: humidity
      });
    } else {
      res.render("index");
    }
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

app.listen(port, () => console.log(`App running on port ${port}`));
