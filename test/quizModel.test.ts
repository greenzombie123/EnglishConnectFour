import { describe, expect, test } from "@jest/globals";
import quizModel, { CorrectSentence, ScrambledSentence } from "../src/quizModel"
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