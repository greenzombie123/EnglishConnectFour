import { describe, expect, test } from "@jest/globals";
import quizModel, { CorrectSentence } from "../src/quizModel"
import { XAxisWords, XWord, YAxisWords, YWord } from "../src/model";

describe("getSentence", ()=>{
    test("Get a correct sentence when you pass 'I' and 'eat' as arguments", ()=>{
        const expected:CorrectSentence = {sentence:["I", "eat", "rice", "everyday"], type:"correct"}
        const [yWord, xWord]:[YWord, XWord] = ["I", "eat"] 
        const result = quizModel.getSentence(yWord, xWord)

        expect(result).toEqual(expected)
    })
})