const logo = document.getElementById("logo")
const homeButton = document.getElementById("home-button")
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
const resultsSummary = document.getElementById("results-summary")
const playAgainButton = document.getElementById("play-again-button")

let currentQuestionNumber = 0
let quiz

const updateAnswerBox = (back, type) => {
    let answerForm = document.getElementById("answer-form")
    if (answerForm) {
        document.getElementById("answer-form").remove()
    }
    if (type === "freeform") {
        answerBox.innerHTML = `<form id='answer-form' autocomplete='off'>
        <input type='text' id='answer-field' class='answer-field' maxlength='20'>
    </form>`
        if (back) {
            let answerField = document.getElementById("answer-field")
            answerField.value = quiz._questions[currentQuestionNumber]._userAnswer
        }
    }

    if (type === "multichoice") {
        let answerCounter = 0
        let answerForm = answerBox.appendChild(document.createElement("form"))
        answerForm.autocomplete = "off"
        answerForm.id = "answer-form"
        answerForm.style.margin = "2% 0"
        let answerList = answerForm.appendChild(document.createElement("ol"))
        answerList.id = "answer-list"
        quiz._questions[currentQuestionNumber]._answers.forEach(answer => {
            answerCounter++
            let answerListItem = answerList.appendChild(document.createElement("li"))
            answerListItem.onclick = checkRadioButton
            let radioButton = answerListItem.appendChild(document.createElement("input"))
            let radioButtonLabel = answerListItem.appendChild(document.createElement("label"))
            radioButton.type = "radio"
            radioButton.name = "answers"
            radioButton.class = "answers"
            radioButton.id = `answer-${answerCounter}`
            radioButtonLabel.for = `answer-${answerCounter}`
            radioButtonLabel.innerHTML = `${toTitleCase(answer)}`
        })
        if (back) {
            let answerList = document.getElementById("answer-list")
            let answers = answerList.getElementsByTagName("li")
            let userAnswer = [...answers].find(answer => answer.lastElementChild.innerHTML === quiz._questions[currentQuestionNumber]._userAnswer)
            console.log(userAnswer)
            if (userAnswer) {
                userAnswer.firstElementChild.checked = true
            }
        }
    }
}

const updateQuestionBox = (type) => {
    if (type === "freeform" | type === "multichoice") {
        questionBox.innerHTML = `<p>${(currentQuestionNumber + 1)}. ${quiz._questions[currentQuestionNumber]._questionText}</p>`
    }
}

const updateUserAnswer = () => {
    const answerField = document.getElementById("answer-field")
    if (quiz._questions[currentQuestionNumber]._type === "freeform") {
        quiz._questions[currentQuestionNumber]._userAnswer = answerField.value.toString()
    }
    if (quiz._questions[currentQuestionNumber]._type === "multichoice") {
        let answerList = document.getElementById("answer-list")
        let answers = answerList.getElementsByTagName("li")
        let chosenAnswer = [...answers].find(answer => answer.firstElementChild.checked)
        if (chosenAnswer) {
            quiz._questions[currentQuestionNumber]._userAnswer = chosenAnswer.lastElementChild.textContent
        } else {
            quiz._questions[currentQuestionNumber]._userAnswer = ""
        }
    }
}

const nextQuestion = (start) => {
    if (start === false) {
        updateUserAnswer()
        currentQuestionNumber++
        backButton.style.display = "flex"
        questionNavButtons.style.justifyContent = "space-between"
    }
    if (currentQuestionNumber === (quiz._questions.length - 1)) {
        nextButton.firstElementChild.innerHTML = "Finish"
        nextButton.onclick = end
    }
    updateAnswerBox(false, quiz._questions[currentQuestionNumber]._type)
    updateQuestionBox(quiz._questions[currentQuestionNumber]._type)
}

const back = () => {
    updateUserAnswer()
    currentQuestionNumber--
    updateAnswerBox(true, quiz._questions[currentQuestionNumber]._type)
    updateQuestionBox(quiz._questions[currentQuestionNumber]._type)
    nextButton.firstElementChild.innerHTML = "Next"
    nextButton.onclick = (event) => nextQuestion(false)
    if (currentQuestionNumber === 0) {
        backButton.style.display = "none"
        questionNavButtons.style.justifyContent = "center"
    }
}

const start = () => {
    nextQuestion(true)
    answerBox.style.display = "flex"
    nextButton.firstElementChild.innerHTML = "Next"
    nextButton.onclick = (event) => nextQuestion(false)
}

const createResultItems = () => {
    resultsSummary.innerHTML = `You scored: ${quiz.markQuiz()}/${quiz._questions.length}`
    quiz._questions.forEach(question => {
        let result = ""
        let resultColor = ""
        if (question._result) {
            result = "Correct!"
            resultColor = "green"
        } else {
            result = "Incorrect!"
            resultColor = "red"
        }
        const listItem = resultsList.appendChild(document.createElement("li"))
        listItem.innerHTML = `<h3>${question._questionText}</h3>
        <p class="question-result" style="color: ${resultColor}">${result}</p>
        <p>You answered: <span class="user-answer" style="color: ${resultColor}">${question._userAnswer}</span></p>
        <p>The correct answer was: <span class="correct-answer">${toTitleCase(question._answers[question._correctAnswer])}</span></p>`
    })
}

const end = () => {
    updateUserAnswer()
    resultsBox.style.display = "flex"
    answerBox.style.display = "none"
    questionNavButtons.style.display = "none"
    questionFrame.style.display = "none"
    resultsHeader.style.display = "inline-block"
    createResultItems()
}

const refresh = () => {
    quiz._questions.forEach(question => question.shuffleAnswers())
    window.location.reload()
}

const goHome = () => {
    console.log("Home button clicked")
    window.location.href = `./index.html`
}

const checkRadioButton = event => {
    console.log(event.target.tagName)
    if (event.target.tagName === "LABEL") {
        event.target.parentElement.firstElementChild.checked = true
    } else if (event.target.tagName === "LI") {
        event.target.firstElementChild.checked = true
    }
}

const initialLoad = () => {
    currentQuestionNumber = 0
    quiz = quiz1
    questionBox.innerHTML = "<p>Welcome to League of Trivia!</p>"
    quiz.shuffleQuestions()
    quiz._questions.forEach(question => question.shuffleAnswers())
}

homeButton.onclick = goHome
nextButton.onclick = start
backButton.onclick = back
logo.onclick = refresh
playAgainButton.onclick = refresh

initialLoad()