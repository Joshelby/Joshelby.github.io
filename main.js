const nextButton = document.getElementById("next-button")
const backButton = document.getElementById("back-button")
const questionSection = document.getElementById("question-section")
const questionFrame = document.getElementById("question-frame")
const questionBox = document.getElementById("question-box")
const questionNavButtons = document.getElementById("question-nav-buttons")
const answerBox = document.getElementById("answer-box")
const resultsHeader = document.getElementById("results-header")
const resultsBox = document.getElementById("results-box")
const resultsList = document.getElementById("results-list")

let currentQuestionNumber = 0

let quiz = quiz1

const updateAnswerBox = (type) => {
    if (type === "freeform") {
        answerBox.innerHTML = `<form id='answer-form' autocomplete='off'>
        <input type='text' id='answer-field' maxlength='20'>
    </form>`
    }
}

const updateQuestionBox = (type) => {
    console.log(currentQuestionNumber)
    if (type === "freeform") {
        questionBox.innerHTML = `<p>${(currentQuestionNumber + 1)}. ${quiz._questions[currentQuestionNumber]._questionText}</p>`
    }
}

const nextQuestion = (start = false) => {
    console.log("nextQuestion called")
    console.log(start)
    if (start === false) {
        console.log("Incrementing currentQuestionNumber")
        const answerField = document.getElementById("answer-field")
        quiz._questions[currentQuestionNumber]._userAnswer = answerField.value.toString()
        currentQuestionNumber++
    }
    if (currentQuestionNumber === (quiz._questions.length - 1)) {
        nextButton.firstElementChild.innerHTML = "Finish"
        nextButton.onclick = end
    }
    updateAnswerBox(quiz._questions[currentQuestionNumber]._type)
    updateQuestionBox(quiz._questions[currentQuestionNumber]._type)
}

const start = () => {
    nextQuestion(true)
    answerBox.style.display = "flex"
    questionNavButtons.style.justifyContent = "space-between"
    backButton.style.display = "flex"
    nextButton.firstElementChild.innerHTML = "Next"
    nextButton.onclick = (event) => nextQuestion(false)
}

const createResultItems = () => {
    quiz._questions.forEach(question => {
        let result = ""
        let resultColor = ""
        if (question._result === true) {
            result = "Correct!"
            resultColor = "green"
        } else {
            result = "Incorrect!"
            resultColor = "red"
        }
        const listItem = resultsList.appendChild(document.createElement("li"))
        listItem.innerHTML = `<h3>${question._questionText}</h3>
        <p class="question-result" style="color: ${resultColor}">${result}</p>
        <p>You answered: <span class="user-answer">${question._userAnswer}</span></p>
        <p>The correct answer was: <span class="correct-answer">${toTitleCase(question._answers[question._correctAnswer])}</span></p>`
    })
}

const end = () => {
    const answerField = document.getElementById("answer-field")
    quiz._questions[currentQuestionNumber]._userAnswer = answerField.value.toString().toLowerCase()
    resultsBox.style.display = "flex"
    answerBox.style.display = "none"
    questionNavButtons.style.display = "none"
    questionFrame.style.display = "none"
    resultsHeader.style.display = "inline-block"
    quiz.markQuiz()
    createResultItems(quiz)
}

const initialLoad = () => {
    questionBox.innerHTML = "<p>Welcome to League of Trivia!</p>"
}

nextButton.onclick = start

initialLoad()