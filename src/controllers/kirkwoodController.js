import axios from "axios";
import Handlebars from "handlebars";

export default function kirkwoodController() {
  console.log("this is kirkwood!");

  axios.get("templates/kirkwood.hbs").then((kirkwoodResponse) => {
    return render(kirkwoodResponse.data);
  });

  function render(kirkwoodTemplateHtml) {
    const kirkwoodTemplateFunc = Handlebars.compile(kirkwoodTemplateHtml);
    document.getElementById("root").innerHTML = kirkwoodTemplateFunc();

    // Current weather being pulled via API
    const options = {
      method: "GET",
      url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
      params: { lon: "-120.0673605", lat: "38.6847556" },
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

        document.getElementById("root").innerHTML = kirkwoodTemplateFunc({
          description: forecast.weather.description,
          temp: tempFahrenheit
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
