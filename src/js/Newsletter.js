import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,20}$/;

export default class Newsletter {
  constructor(formSelector = "#newsletter-form") {
    this.form = document.querySelector(formSelector);
  }

  init() {
    if (!this.form) {
      return;
    }
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.form.email.value.trim();
    const phone = this.form.phone.value.trim();
    const errorElement = document.querySelector("#newsletter-error");

    const error = this.validate(email, phone);
    if (error) {
      errorElement.textContent = error;
      return;
    }
    errorElement.textContent = "";

    const signups = getLocalStorage("so-newsletter-signups") || [];
    signups.push({ email, phone });
    setLocalStorage("so-newsletter-signups", signups);

    this.form.hidden = true;
    document.querySelector("#newsletter-success").hidden = false;
  }

  validate(email, phone) {
    if (!email || !phone) {
      return "Please provide both an email address and a phone number.";
    }
    if (!EMAIL_PATTERN.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!PHONE_PATTERN.test(phone)) {
      return "Please enter a valid phone number.";
    }
    return "";
  }
}
