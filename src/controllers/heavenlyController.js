import axios from "axios";
import Handlebars from "handlebars";

export default function heavenlyController() {
  console.log("HEAVENLY HERE!");

  axios.get("templates/heavenly.hbs").then((heavenlyResponse) => {
    return render(heavenlyResponse.data);
  });

  function render(heavenlyTemplateHtml) {
    const heavenlyTemplateFunc = Handlebars.compile(heavenlyTemplateHtml);
    document.getElementById("root").innerHTML = heavenlyTemplateFunc();

    // Data from API
    const options = {
      method: "GET",
      url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
      params: { lon: "-119.9399", lat: "38.9353" },
      headers: {
        "x-rapidapi-key": "9dcf56c5b4msh7ce44847e8e404ap128b54jsn8d054fb12553",
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
      }
    };

    axios
      .request(options)
      .then(function (response) {
        const forecast = response.data.data[0];
        console.log(forecast);

        const tempCelsius = forecast.temp;
        const tempFahrenheit = tempCelsius * (9 / 5) + 32;

        document.getElementById("root").innerHTML = heavenlyTemplateFunc({
          description: forecast.weather.description,
          temp: tempFahrenheit
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
