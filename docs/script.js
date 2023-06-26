window.onload = () => {
  // Loading Animation Script
  document.querySelector(".loading").style.opacity = "0";
  setTimeout((e) => document.querySelector(".loading").remove(), 400);

  // API URL
  /**
   * https://api.open-meteo.com/v1/forecast?latitude=77.0151&longitude=18.9931&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m
   */

  const API_URL =
    "https://api.open-meteo.com/v1/forecast?longitude=77.0151&latitude=18.9931&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

  const iconElement = document.querySelector("div[temp]");
  const tempElement = document.querySelector("div[temp] p:nth-child(1)");

  fetch(API_URL, { method: "GET" })
    .then((data) => data.json())
    .then((json) => {
      console.log(json);
      tempElement.innerHTML = json.current_weather.temperature + "°";
    });

  // time loc

  const timeElem = document.querySelector("div[timeLoc] p:nth-child(1)");
  const locElem = document.querySelector("div[timeLoc] p:nth-child(2)");

  const time = new Date();
  const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
  const minutes = time.getMinutes();
  timeElem.innerHTML = `${String(hours).length == 1 ? "0" + hours : hours}:${
    String(minutes).length == 1 ? "0" + minutes : minutes
  } ${time.getHours() > 12 ? "PM" : "AM"}`;

  (function () {
    $(".memContainer > div").tilt({
      maxTilt: 15,
      perspective: 1400,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      speed: 1200,
      glare: true,
      maxGlare: 0.2,
      scale: 1.04,
    });
  })();
};
