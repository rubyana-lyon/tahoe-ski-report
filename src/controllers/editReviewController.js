import axios from "axios";
import Handlebars from "handlebars";
import database from "../firebaseConfig";

export default function editReviewController() {
  console.log("EDIT REVIEW HERE!");
  axios.get("templates/editReview.hbs").then((response) => {
    const editPageHtml = response.data;

    return render(editPageHtml);
  });

  function render(editPageHtml) {
    const editPageFunc = Handlebars.compile(editPageHtml);

    // Retrieve user ID from localStorage
    const reviewId = window.localStorage.getItem("reviewId");

    database
      .ref("reviews")
      .child(reviewId)
      .on("value", (results) => {
        const oneReview = results.val();

        document.getElementById("root").innerHTML = editPageFunc(oneReview);
      });

    document.getElementById("edit-review-form").addEventListener("submit", (event) => {
      event.preventDefault();

      database
        .ref("reviews")
        .child(reviewId)
        .update({
          name: document.querySelector("input[name='name']").value,
          resort: document.querySelector("select[name='resort']").value,
          review: document.querySelector("textarea[name='review']").value
        })
        .then(() => {
          window.location.href = "#/homepage";
        });
    });

    document.getElementById("delete-review-button").addEventListener("click", () => {
      database
        .ref("reviews")
        .child(reviewId)
        .remove()
        .then(() => {
          window.location.href = "#/homepage";
        });
    });
  }
}
