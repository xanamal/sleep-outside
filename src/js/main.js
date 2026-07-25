import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";
import Newsletter from "./Newsletter.js";

loadHeaderFooter();

// Load and display any announcement alerts
const alert = new Alert();
alert.render();

// Wire up the newsletter signup form
const newsletter = new Newsletter();
newsletter.init();
