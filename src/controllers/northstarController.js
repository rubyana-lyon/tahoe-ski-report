import axios from "axios";
import Handlebars from "handlebars";

export default function northstarController() {
  console.log("this is northstar!");

  axios.get("templates/northstar.hbs").then((northstarResponse) => {
    return render(northstarResponse.data);
  });

  function render(northstarTemplateHtml) {
    const northstarTemplateFunc = Handlebars.compile(northstarTemplateHtml);
    document.getElementById("root").innerHTML = northstarTemplateFunc();

    // Current weather being pulled via API
    const options = {
      method: "GET",
      url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
      params: { lon: "-120.1211", lat: "39.2746" },
      headers: {
        "x-rapidapi-key": "4ce59125femsh552bf094bc57108p12871ajsne81ad2bd895e",
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

        document.getElementById("root").innerHTML = northstarTemplateFunc({
          description: forecast.weather.description,
          temp: tempFahrenheit
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
