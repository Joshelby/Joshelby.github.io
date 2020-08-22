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
        if (this._userAnswer) {
            this._result = (this._userAnswer.toLowerCase() === this._answers[this._correctAnswer])
        }
    }
    shuffleAnswers() {
        let correctAnswer = this._answers[this._correctAnswer]
        shuffle(this._answers)
        this._correctAnswer = this._answers.findIndex(answer => answer === correctAnswer)
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
        let score = 0
        this._questions.forEach(question => {
            question.checkAnswer()
            if (question._result) {
                score++
            } 
        })
        return score
    }
    shuffleQuestions() {
        shuffle(this._questions)
    }
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
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
quiz1.addQuestion("How much gold does B.F. Sword cost?", ["1300", "1200", "1500", "1600"], 0, "multichoice")