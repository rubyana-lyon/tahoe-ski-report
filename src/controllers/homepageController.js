import axios from "axios";
import Handlebars from "handlebars";
import database from "../firebaseConfig";

export default function homepageController() {
  console.log("HOMEPAGE HERE!");

  axios.get("templates/homepage.hbs").then((response1) => {
    const homepageTemplateHtml = response1.data;

    axios.get("templates/oneReviewRow.hbs").then((response2) => {
      const oneReviewRowHtml = response2.data;

      return render(homepageTemplateHtml, oneReviewRowHtml);
    });
  });

  function render(homepageTemplateHtml, oneReviewRowHtml) {
    const homepageTemplateFunc = Handlebars.compile(homepageTemplateHtml);
    const oneUserRowFunc = Handlebars.compile(oneReviewRowHtml);

    document.getElementById("root").innerHTML = homepageTemplateFunc();

    // Firebase record goes here
    database.ref("reviews").on("value", (results) => {
      const tbody = document.querySelector("tbody");

      tbody.innerHTML = "";

      results.forEach((result) => {
        const review = result.val();
        const reviewId = result.key;

        tbody.innerHTML += oneUserRowFunc({
          ...review,
          id: reviewId
        });
      });
    });
    // end

    // Event delegation
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("edit-review-link")) {
        event.preventDefault();

        const reviewId = event.target.getAttribute("data-review-id");

        // Save the user ID to localStorage for retrieval later
        window.localStorage.setItem("reviewId", reviewId);

        window.location.href = "#/edit-review";
      }
    });

    //
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
