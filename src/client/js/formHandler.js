import axios from "axios";
import { isValidURL } from "./URLChecker.js";

const validateURL = (url) => {
    const feedbackWrapper = document.querySelector(".feedback-wrapper");
    feedbackWrapper.innerHTML = "";

    if (!isValidURL(url)) {
        feedbackWrapper.innerHTML = "<p class='feedback-error'>Please enter a valid URL.</p>";
        return false;
    }
    return true;
};

const toggleLoader = (show) => {
    const loader = document.querySelector(".loader");
    loader.style.visibility = show ? "visible" : "hidden";
};

const showError = (show, message = "") => {
    const errorWrapper = document.querySelector(".error-wrapper");
    errorWrapper.style.display = show ? "block" : "none";
    errorWrapper.innerHTML = show ? `<p class='error-message'>${message}</p>` : "";
};

const updateResults = (data) => {
    const resultSection = document.getElementById("result");

    if (!data) {
        showError(true, "An unexpected internal error occurred. Please try again later.");
        return;
    }

    if (data.error) {
        showError(true, data.error);
        return;
    }

    resultSection.innerHTML = `
        <p class="result-part">Sentiment Score: <span>${data.score_tag}</span></p>
        <p class="result-part">Agreement Level: <span>${data.agreement}</span></p>
        <p class="result-part">Subjectivity Level: <span>${data.subjectivity}</span></p>
        <p class="result-part">Confidence Level: <span>${data.confidence}</span></p>
        <p class="result-part">Irony Detected: <span>${data.irony}</span></p>
    `;
};

const submitFormHandler = async (event) => {
    event.preventDefault();
    const urlInput = document.querySelector("#url-form input");
    const feedbackWrapper = document.querySelector(".feedback-wrapper");

    showError(false);
    if (!validateURL(urlInput.value)) return;

    toggleLoader(true);

    try {
        const response = await axios.post("http://localhost:8000/", { url: urlInput.value });
        updateResults(response.data);

        feedbackWrapper.innerHTML = `
            <p class='feedback-success'>The URL was successfully analyzed! Check the results below.</p>
        `;
    } catch (error) {
        showError(true, "There was an error processing your request. Please try again later.");
    } finally {
        toggleLoader(false);
    }
};

export { submitFormHandler };
