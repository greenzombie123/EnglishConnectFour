import { ScrambledSentence, UserAnswer } from "./quizModel"

type QuizView = {
    renderWords:(quiz:ScrambledSentence, answer:UserAnswer)=>{ssWords:HTMLDivElement[], uaWords:HTMLDivElement[]},
    revealQuiz:()=>void
}

const quizView = ():QuizView=>{
    const quiz = document.querySelector("dialog.quiz") as HTMLDialogElement
    const question = quiz.querySelector(".question") as HTMLDivElement
    const scrambledSentence = quiz.querySelector(".scrambledSentence") as HTMLDivElement
    const userAnswer = quiz.querySelector(".userAnswer") as HTMLDivElement 
    const resetButton = quiz.querySelector(".resetButton") as HTMLButtonElement

    const renderWords = (quiz:ScrambledSentence, answer:UserAnswer):{ssWords:HTMLDivElement[], uaWords:HTMLDivElement[]}=>{
        const ssWords:HTMLDivElement[] = quiz.words.map(word=>{
            const wordCard = document.createElement("div")
            wordCard.textContent = word
            wordCard.className = "word"
            scrambledSentence.appendChild(wordCard)
            return wordCard
        }) 

        const uaWords:HTMLDivElement[] = answer.words.map(word=>{
            const wordCard = document.createElement("div")
            wordCard.textContent = word
            wordCard.className = "word"
            userAnswer.appendChild(wordCard)
            return wordCard
        })

        return {ssWords, uaWords}
    }

    const revealQuiz = ()=> {quiz.showModal()}

    // revealQuiz()
    return {renderWords, revealQuiz}
}

export default quizView()

