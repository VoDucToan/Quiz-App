const questions = [
    {
        question: "Thái Văn thích ai?",
        answers: [
            {
                text: "Người yêu cũ",
                correct: false
            },
            {
                text: "Em gái mưa",
                correct: true
            },
            {
                text: "Út Quyên",
                correct: false
            },
            {
                text: "Phúc",
                correct: false
            }
        ]
    },
    {
        question: "Ai thích Thái Văn?",
        answers: [
            {
                text: "Người yêu cũ",
                correct: false
            },
            {
                text: "Em gái mưa chỉ coi là bạn",
                correct: false
            },
            {
                text: "Út Quyên",
                correct: false
            },
            {
                text: "Không biết nữa",
                correct: true
            }
        ]
    }
]

const title = document.getElementById("title");
const quiz = document.getElementById("quiz");
const control = document.getElementById("control");

let currentQuestionIndex = 0;
let score = 0;

let startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    control.innerHTML = "Next";
    showQuestion();
}

let showQuestion = () => {
    resetState();
    title.innerHTML = currentQuestionIndex + 1 + '. ' + questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer");
        quiz.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (e) => {
            const selectedBtn = e.target;
            if (selectedBtn.dataset.correct === "true") {
                selectedBtn.classList.add("correct");
                score++;
            }
            else {
                selectedBtn.classList.add("incorrect");
            }
            Array.from(quiz.children).forEach((button) => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            })
            control.style.display = "block";
        })
    })
    currentQuestionIndex++;
}

let showResult = () => {
    resetState();
    title.innerHTML = `You scored ${score} out of ${questions.length}!`;
    control.innerHTML = "Play Agian";
    control.style.display = "block";
    currentQuestionIndex++;
}

let resetState = () => {
    control.style.display = "none";
    while (quiz.firstChild) {
        quiz.removeChild(quiz.firstChild);
    }
}

control.addEventListener("click", (e) => {
    if (currentQuestionIndex === questions.length) {
        showResult();
    }
    else if (currentQuestionIndex > questions.length) {
        startQuiz();
    }
    else {
        showQuestion();
    }
})
startQuiz();