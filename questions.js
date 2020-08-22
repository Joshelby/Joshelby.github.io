class Question {
    constructor(questionText, answers, correctAnswer, type) {
        this._questionText = questionText
        this._answers = answers
        this._correctAnswer = correctAnswer
        this._type = type
        this._userAnswer
        this._result
    }
    checkAnswer() {
        this._result = (this._userAnswer.toLowerCase() === this._answers[this._correctAnswer])
    }
}

class Quiz {
    constructor() {
        this._questions = []
    }
    addQuestion(questionText, answers, correctAnswer, type) {
        this._questions.push(new Question(questionText, answers, correctAnswer, type))
    }
    markQuiz() {
        this._questions.forEach(question => question.checkAnswer())
    }
}

function toTitleCase(string) {
    const capLetter = string[0].toUpperCase()
    const capString = capLetter + string.slice(1)
    return capString
}

let test = "hello"

const quiz1 = new Quiz()
quiz1.addQuestion("What is the name of Yasuo's brother?", ["steve", "yone", "dave", "ben"], 1, "freeform")
quiz1.addQuestion("How much gold does B.F. Sword cost?", ["1300", "1200", "1500", "1600"], 0, "freeform")