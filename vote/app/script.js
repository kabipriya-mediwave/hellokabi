const ageInput = document.querySelector("#inp");
const result = document.querySelector("#result");
const calculateButton = document.querySelector("#calc");
const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", function () {
  ageInput.value = "";
  result.innerHTML = "<h3>" + "welcome" + "</h3>";
});

calculateButton.addEventListener("click", function () {
  let userAge = ageInput.value;
  if (userAge == "") {
    result.innerHTML = "<h3>" + "please enter the age" + "</h3>";
  } else {
    if (userAge >= 18) {
      result.innerHTML =
        "<h3 class=success>" + "your eligible to vote" + "</h3>";
    } else {
      result.innerHTML =
        "<h3 class=failure>" + "your not eligible to vote" + "</h3>";
    }
  }
});
