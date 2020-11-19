/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "What colors represent the Philadelphia Eagles?",
      answers: [
        "red and blue",
        "green and black",
        "purple and yellow",
        "gold and white",
      ],
      correctAnswer: "green and black",
    },
    {
      question: "What is the name of the mascot for the Philadelphia Eagles?",
      answers: ["Swoop", "Blitz", "Rampage", "Toro"],
      correctAnswer: "Swoop",
    },
    {
      question:
        "What year did the Philadelphia Eagles win their last superbowl?",
      answers: ["1980", "2001", "1993", "2018"],
      correctAnswer: "2018",
    },
    {
      question: "Which stadium do the Philadelphia Eagles play in?",
      answers: [
        "Heinz Field",
        "Nissan Stadium",
        "Soldier Field",
        "Lincoln Financial Field",
      ],
      correctAnswer: "Lincoln Financial Field",
    },
    {
      question:
        "What is the name of the starting quarterback for the Philadelphia Eagles?",
      answers: ["Carson Wentz", "Tom Brady", "Russell Wilson", "Josh Allen"],
      correctAnswer: "Carson Wentz",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  feedbackGiven: true,
  score: 0,
  checkedAnswer: "",
  correctScore: 0,
  incorrectScore: 0,
  quizFinal: false,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//Quiz App Code Below---------------------------------------------------

//Generate Start Quiz Page
function generateStartPage() {
  return `<div>
        <h2>Welcome to the quiz!</h2>
        <p>
          Test your knowledge about the Philadelphia Eagles and see if you are a
          true fan of the football team.
        </p>
        <button id=startQuiz>Start the Quiz</button>
      </div>`;
}

//Start Quiz Button to Question Page
function handleStartButton() {
  $("main").on("click", "#startQuiz", function (event) {
    store.quizStarted = true;
    render();
  });
}

//Generate Question Page
function generateQuestionPage() {
  let currentQuestion = store.questions[store.questionNumber];
  let answers = currentQuestion.answers.map(function (answer, index) {
    if (index === 0) {
      return `<input type="radio" id="answer${index}" name="answer" value="${answer}"/><label for="answer${index}" required>${answer}</label></br></br>`;
    } else {
      return `<input type="radio" id="answer${index}" name="answer" value="${answer}"/><label for="answer${index}">${answer}</label></br></br>`;
    }
  });

  return `<div class="questionPage">
        <form id="question">
        <h2>Question ${store.questionNumber + 1} of ${
    store.questions.length
  }</h2>
        <h3>${currentQuestion.question}</h3>
        ${answers.join("")}
        <button type="submit">Submit Answer</button>
        <h4>Score: ${store.score}</h4>
        <p>${store.correctScore} correct/${store.incorrectScore} incorrect</P>
        </form>
        </div>`;
}

//Submit Button to Feedback Page
function handleSubmitAnswer() {
  $("main").on("submit", function (event) {
    event.preventDefault();
    store.feedbackGiven = false;
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    store.checkedAnswer = $(`input[name="answer"]:checked`).val();
    if (store.checkedAnswer === correctAnswer) {
      store.score++;
      store.correctScore++;
    } else {
      store.incorrectScore++;
    }
    console.log(store.score);
    render();
  });
}

//Generate Feedback Page
function generateFeedbackPage() {
  let feedbackStatement = "";
  if (
    store.checkedAnswer === store.questions[store.questionNumber].correctAnswer
  ) {
    feedbackStatement = "You answered the question correctly!";
  } else {
    feedbackStatement = "Oh No! You answered the question incorrectly!";
  }
  return `<div>
        <h2>Question ${store.questionNumber + 1} Answer</h2>
        <h4>Score: ${store.score}</h4>
        <p>${feedbackStatement}<p>
        <p>The correct answer is ${
          store.questions[store.questionNumber].correctAnswer
        }.</p>
        <p>
          Your current score is ${store.score} out of ${
    store.questions.length
  } points.</p>
        <button id="nextBtn">Next</button>
      </div>`;
}

//handleNextButton
function handleNextBtn() {
  $("main").on("click", "#nextBtn", function (event) {
    store.feedbackGiven = true;
    store.questionNumber++;
    store.checkedAnswer = "";
    render();
  });
}

//Generate Finish Page
function generateFinishPage() {
  return `<div>
      <h2>Congratualations!</h2>
      <h3>You have finished the quiz</h3>
      <p>Your total score is ${store.score} out of ${store.questions.length}!</p>
      <p>If you want to try the quiz again then click the button below.</p>
      <button id="restart">Restart Quiz</button>
    </div>`;
}

//Generate Restart Quiz Button
function handleRestart() {
  $("main").on("click", "#restart", function (event) {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    store.feedbackGiven = true;
    store.checkedAnswer = 0;
    store.correctScore = 0;
    store.incorrectScore = 0;
    render();
  });
}

//Render function to update state of page
function render() {
  let html = "";
  if (!store.quizStarted) {
    html = generateStartPage();
  } else if (store.feedbackGiven) {
    html = generateQuestionPage();
  } else if (
    store.feedbackGiven === false &&
    store.questionNumber === store.questions.length - 1
  ) {
    html = generateFinishPage();
  } else {
    html = generateFeedbackPage();
  }
  $("main").html(html);
}

//Main Function to run on page load
function main() {
  render();
  handleStartButton();
  handleSubmitAnswer();
  handleNextBtn();
  handleRestart();
}
$(main);
