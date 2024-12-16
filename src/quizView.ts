import { ScrambledSentence, UserAnswer } from "./quizModel"

export type QuizView = {
    renderWords:(quiz:ScrambledSentence, answer:UserAnswer)=>{ssWords:HTMLDivElement[], uaWords:HTMLDivElement[]},
    revealQuiz:()=>void,
    renderTranslation:(tranlation:string)=>void,
    hideQuiz:()=>void,
    getResetButton:()=>HTMLButtonElement
}

const quizView = ():QuizView=>{
    const quiz = document.querySelector("dialog.quiz") as HTMLDialogElement
    const question = quiz.querySelector(".question") as HTMLDivElement
    const scrambledSentence = quiz.querySelector(".scrambledSentence") as HTMLDivElement
    const userAnswer = quiz.querySelector(".userAnswer") as HTMLDivElement 
    const resetButton = quiz.querySelector(".resetButton") as HTMLButtonElement
    
    const renderTranslation = (tranlation:string)=>{question.textContent = tranlation}

    const renderWords = (quiz:ScrambledSentence, answer:UserAnswer):{ssWords:HTMLDivElement[], uaWords:HTMLDivElement[]}=>{
        
        scrambledSentence.replaceChildren()
        const ssWords:HTMLDivElement[] = quiz.words.map(word=>{
            const wordCard = document.createElement("div")
            wordCard.textContent = word
            wordCard.className = "word"
            scrambledSentence.appendChild(wordCard)
            return wordCard
        }) 

        userAnswer.replaceChildren()
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
    const hideQuiz = ()=> {quiz.close()}
    const getResetButton = ()=> resetButton

    // revealQuiz()
    return {renderWords, revealQuiz, renderTranslation, hideQuiz, getResetButton}
}

export default quizView()

