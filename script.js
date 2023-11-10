const questions = [
    {
        question: "What is the most common surname in the United States?",
        answers: [
            { text: "Williams", correct: false},
            { text: "Martinez", correct: false},
            { text: "Smith", correct: true},
            { text: "Brown", correct: false},
        ]
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        answers: [
            { text: "Ares", correct: false},
            { text: "Apollo", correct: true},
            { text: "Demeter", correct: false},
            { text: "Artemis", correct: false},
        ]
    },
    {
        question: "How many known elements are on the periodic table as of November 10th, 2023?",
        answers: [
            { text: "117", correct: false},
            { text: "119", correct: false},
            { text: "118", correct: true},
            { text: "120", correct: false},
        ]
    },
    {
        question: "What art form is described as 'decorative handwriting or handwritten lettering'?",
        answers: [
            { text: "Calligraphy", correct: true},
            { text: "Hand Letteting", correct: false},
            { text: "Penmanship", correct: false},
            { text: "Autography", correct: false},
        ]
    },
    {
        question: "What country has won the most FIFA World Cups as of 2022?",
        answers: [
            { text: "Argentina", correct: false},
            { text: "Brazil", correct: true},
            { text: "Germany", correct: false},
            { text: "Italy", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//to start the quiz at first question and no previous score
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    //calls the next question
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    //need question number depend on number of current question seen
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //to display the answers for the specific question
    currentQuestion.answers.forEach(answer => {
        //each answer is a button
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        //display button in the div that is correct
        answerButtons.appendChild(button);
       
        if(answer.correct){
            //the true or false element
            button.dataset.correct = answer.correct;
        }
         //to record the selected answer
        button.addEventListener("click", selectAnswer);
    });
}

//to remove the previous answers
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//to click on selected answer
//will check that the selected answer is correct
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        //score increase when correct answer given
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    //disable ability to click multiple answers
    //automatically show correct answer after first try
    //shows next button after selecting
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//display the score
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//if another question left will display the next question
//if last question will show the score
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=> {
    //if number of questions is 4, question length is 4
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});


//to call start quiz function
startQuiz();