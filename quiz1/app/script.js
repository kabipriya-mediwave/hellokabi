const Computer_Science = [
  {
    id: 1,
    question: " 1.In which decade was the Internet first implemented?",
    options: ["(A) 1940s", "(B) 1950s", "(C) 1960s", "(D) 1980s"],
    answer: "(C) 1960s",
  },
  {
    id: 2,
    question: "2.Where are the contents of your computer's hard drive indexed?",
    options: ["(A) Yahoo!", "(B) Google", "(C) MSN", "(D) None of the above"],
    answer: "(D) None of the above",
  },
  {
    id: 3,
    question: " 3.ISP stands for:",
    options: [
      "(A) Internet Survey Period",
      "(B) Integrated Service Provider",
      "(C) Internet Security Protocol",
      "(D) Internet Service Provider",
    ],
    answer: "(D) Internet Service Provider",
  },
  {
    id: 3,
    question: " 4.Internet Explorer is a:",
    options: [
      "(A) Any person browsing the net",
      "(B) Web Browser",
      "(C) Graphing Package",
      "(D) News Reader",
    ],
    answer: "(B) Web Browser",
  },
];
const current_affairs = [
  {
    id: "1",
    question:
      "1.Which institution is to house India’s first technology business incubation centre based on green technology? ",
    options: [
      " [A] IIT Madras",
      "[B] NIT Srinagar",
      "[C] IIT Roorkee",
      "[D] NIT Tiruchirappalli",
    ],
    correctAns: "[B] NIT Srinagar",
  },
  {
    id: "2",
    question:
      "2.Who is the head of the ‘Parliamentary committee on official languages’?",
    options: [
      "[A] Rajnath Singh",
      "[B] Amit Shah",
      "[C] Nitin Gadkari",
      "[D] Piyush Goyal",
    ],
    correctAns: "[B] Amit Shah",
  },
];
const questionCollection = {
  Computer_Science: Computer_Science,
  current_affairs: current_affairs,
};
const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";
const category = [
  {
    name: "Computer_Science",
    value: "Computer_Science",
  },
  {
    name: " current_affairs",
    value: " current_affairs",
  },
];
for (let sub of category) {
  const option = document.createElement("option");
  option.value = sub.value;
  option.textContent = sub.name;
  selectElement.appendChild(option);
}
// Get  selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
  selectedValue = selectElement.value;
  const container = document.querySelector(".container");
  container.style.display = "none";
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  clearContent();
  appendToContent();
  appendToButton();
  updateUiList(selectedValue);
});
// function callQuestion(value){
function updateUiList(value) {
  const app = document.querySelector("#app");
  for (let mcq of questionCollection[value]) {
    const event = MakeQuestionList(mcq);
    app.appendChild(event);
  }
}
function clearContent() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
}
// const urlParams = new URLSearchParams(window.location.search);
// const myType = urlParams.get("type");
// console.log(questionCollection[myType]);
function MakeQuestionList(mcq) {
  const div = document.createElement("div");
  div.setAttribute("class", "question-container");
  div.setAttribute("id", `question-${mcq["id"]}`);
  const questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question");
  const questionParagraph = document.createElement("p");
  questionParagraph.textContent = mcq["question"];
  questionDiv.appendChild(questionParagraph);
  const optionDiv = document.createElement("div");
  optionDiv.setAttribute("class", "options");
  optionDiv.setAttribute("id", "options");
  for (let i = 0; i < mcq.options.length; i++) {
    const label = document.createElement("label");
    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("id", `radio-${mcq["id"]}`);
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i];
    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]));
    optionDiv.appendChild(label);
  }
  const resultdiv = document.createElement("div");
  const resultId = `result-${mcq["id"]}`;
  resultdiv.setAttribute("id", resultId);
  resultdiv.className = "ans-div";
  div.appendChild(questionDiv);
  div.appendChild(optionDiv);
  div.appendChild(resultdiv);
  const submit = document.querySelector("#submitBtn");
  submit.addEventListener("click", function () {
    const selected = document.querySelector(
      `input[name="answer-${mcq.id}"]:checked`
    );
    const checkAnswer = mcq.correctAns;
    if (selected) {
      const selectedAnswer = selected.value;
      if (checkAnswer == selectedAnswer) {
        correctAnsShow(checkAnswer, `${mcq["id"]}`, "green");
      } else {
        correctAnsShow(checkAnswer, `${mcq["id"]}`, "red");
      }
    } else {
      correctAnsShow(checkAnswer, `${mcq["id"]}`, "orange");
    }
  });
  // findwrong Answering(`result-${mcq["id"]}`);
  return div;
}
function correctAnsShow(ans, resultId, add) {
  const divId = `#question-${resultId}`;
  const divClass = "border-" + add;
  const div = document.querySelector(divId);
  div.classList.add(divClass);
  const selector = `#result-${resultId}`;
  const result = document.querySelector(selector);
  result.innerHTML = "Ans: " + ans;
  result.classList.add(add);
}
function appendToButton() {
  const app = document.querySelector("#buttons");
  const submit = document.createElement("button");
  submit.id = "submitBtn";
  submit.innerHTML = "submit";
  const back = document.createElement("button");
  back.id = "backBtn";
  back.innerHTML = "Back";
  app.appendChild(back);
  app.appendChild(submit);
  back.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const quiz = document.querySelector("#quiz");
    quiz.style.display = "none";
    container.style.display = "block";
  });
}
function appendToContent() {
  const content = document.querySelector("#content");
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  // Create another div with the id "buttons"
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "buttons";
  // Append the created div elements to the document's body or another parent element
  content.appendChild(appDiv);
  content.appendChild(buttonsDiv);
}
