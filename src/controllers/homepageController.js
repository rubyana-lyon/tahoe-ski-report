import axios from "axios";
import Handlebars from "handlebars";
import database from "../firebaseConfig";

export default function homepageController() {
  console.log("HOMEPAGE HERE!");

  axios.get("templates/homepage.hbs").then((homepageResponse) => {
    return render(homepageResponse.data);
  });

  function render(homepageTemplateHtml) {
    const homepageTemplateFunc = Handlebars.compile(homepageTemplateHtml);
    document.getElementById("root").innerHTML = homepageTemplateFunc();

    document.getElementById("new-review-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const newReview = {
        name: document.querySelector("input[name='name']").value,
        resort: document.querySelector("select[name='resort']").value,
        review: document.querySelector("textarea[name='review']").value
      };
      console.log(newReview);
      // Add record to firebase using the firecase SDK
      database
        .ref("reviews")
        .push(newReview)
        .then(() => {
          document.getElementById("new-review-form").reset();
        });
    });
  }
}
