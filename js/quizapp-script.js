const questions = [
  {
    question: "Which is the Largest Animal in world ?",
    answer: [
      { text: "Shark", correct: false },
      { text: "Elephant", correct: true },
      { text: "Blue Whale", correct: false },
      { text: "Giraffe", correct: false },
    ]
  },
  {
    question: "Which is the smallest continent in the world ?",
    answer: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ]
  },
  {
    question: "Which is the smallest Country in the world ?",
    answer: [
      { text: "Vatican", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ]
  },
  {
    question: "Which is the Largest Desert in the world ?",
    answer: [
      { text: "Kalhari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ]
  },
  {
    question: "Which country is konw as the 'Playground of Europe' ?",
    answer: [
      { text: "Austria", correct: false },
      { text: "Holland", correct: false },
      { text: "Switzerland", correct: true },
      { text: "Italy", correct: false },
    ]
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

 showQuestion = () =>  {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });

}

 resetState = () => {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  })
  nextButton.style.display = "block";

}


showScore = () => {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();





