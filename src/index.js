import northstarController from "./controllers/northstarController";
import heavenlyController from "./controllers/heavenlyController";
import kirkwoodController from "./controllers/kirkwoodController";
import homepageController from "./controllers/homepageController";

const routes = {
  "/northstar": northstarController,
  "/heavenly": heavenlyController,
  "/kirkwood": kirkwoodController,
  "/homepage": homepageController,
  "/edit-review": editReviewController
};

function setRoute() {
  const currentRoute = window.location.hash.split("#")[1];

  for (let route in routes) {
    // If the route that the loop is currently on matches the route in the URL, call the function associated to that route from the routes object above
    if (route === currentRoute) {
      return routes[route]();
    }
  }
  // Call northstarController if nothing matches
  homepageController();
}

document.addEventListener("DOMContentLoaded", setRoute);
window.addEventListener("hashchange", setRoute);
