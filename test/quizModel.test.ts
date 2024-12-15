import { describe, expect, test } from "@jest/globals";
import quizModel, { CorrectSentence, ScrambledSentence, UserAnswer } from "../src/quizModel"
import { XAxisWords, XWord, YAxisWords, YWord } from "../src/model";

describe("getSentence", ()=>{
    test("Get a correct sentence when you pass 'I' and 'eat' as arguments", ()=>{
        const expected:CorrectSentence = {words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"}
        const [yWord, xWord]:[YWord, XWord] = ["I", "eat"] 
        const result = quizModel.getSentence(yWord, xWord)

        expect(result).toEqual(expected)
    })
})

describe("getWord", ()=>{
    test("Get 'eat' from a sentence", ()=>{
        const sentence:ScrambledSentence = {words:["I", "eat", "rice", "everyday"], type:"scrambled"}
        const index = 2
        const result = quizModel.getWord(index, sentence)

        expect(result).toBe("rice")
    })
})

describe("removeWord", ()=>{
    test("Remove 'eat' from a sentence and return sentence with an array that doesn't have 'eat'", ()=>{
        const sentence:ScrambledSentence = {words:["I", "eat", "rice", "everyday"], type:"scrambled"}
        const expected:ScrambledSentence = {words:["I", "rice", "everyday"], type:"scrambled"}
        const index = 1
        const result = quizModel.removeWord(index, sentence)

        expect(result).toEqual(expected)
    })
})

describe("isAnswerCorrect", ()=>{
    test("Return true if user sentence and answer match", ()=>{
        const correctSentence:CorrectSentence = {words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"}
        const userAnswer:UserAnswer = {words:["I", "eat", "rice", "everyday"], type:"user"}

        const result = quizModel.isAnswerCorrect(userAnswer, correctSentence)

        expect(result).toBe(true)
    })

    test("Return false if user sentence and answer dont match", ()=>{
        const correctSentence:CorrectSentence = {words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"}
        const userAnswer:UserAnswer = {words:["I", "rice", "eat", "everyday"], type:"user"}

        const result = quizModel.isAnswerCorrect(userAnswer, correctSentence)

        expect(result).toBe(false)
    })
})

describe("isUserAnswerReady", ()=>{
    test("Return true if user answer's words array's length same as correct answer's", ()=>{
        const correctSentence:CorrectSentence = {words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"}
        const userAnswer:UserAnswer = {words:["I", "eat", "rice", "everyday"], type:"user"}

        const result = quizModel.isUserAnswerReady(userAnswer, correctSentence)

        expect(result).toBe(true)
    })

    test("Return false if user answer's words array's length is not same as correct answer's", ()=>{
        const correctSentence:CorrectSentence = {words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"}
        const userAnswer:UserAnswer = {words:["I", "eat", "rice"], type:"user"}

        const result = quizModel.isUserAnswerReady(userAnswer, correctSentence)

        expect(result).toBe(false)
    })
})

describe("pickWord", ()=>{
    test("Place 'eat' from currentQuiz into useranswer", ()=>{
        const correctSentence:CorrectSentence = {words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"}
        const scrambledSentence:ScrambledSentence = {words:["eat", "I", "everyday", "rice"], type:"scrambled"}
        quizModel.makeQuiz(scrambledSentence, correctSentence)

        quizModel.pickWord(2, scrambledSentence)

        const quiz:ScrambledSentence = quizModel.getCurrentQuiz()
        const userAnswer:UserAnswer = quizModel.getUserAnswer()

        expect(quiz).toEqual({words:["eat", "I", "rice"], type:"scrambled"})
        expect(userAnswer).toEqual({words:["everyday"], type:"user"})
    })
})

describe("unpickWord", ()=>{
    test("Place 'eat' from useranswer into scrambled", ()=>{
        const answer:UserAnswer = {words:["eat", "rice"], type:"user"}
        const scrambledSentence:ScrambledSentence = {words:["I", "everyday"], type:"scrambled"}

        quizModel.setScrambledSentence(scrambledSentence, undefined)
        quizModel.setUserAnswer(answer, undefined)

        quizModel.unpickWord(1, answer)

        const quiz:ScrambledSentence = quizModel.getCurrentQuiz()
        const userAnswer:UserAnswer = quizModel.getUserAnswer()

        expect(quiz).toEqual({words:["I", "everyday", "rice"], type:"scrambled"})
        expect(userAnswer).toEqual({words:["eat"], type:"user"})
    })
})