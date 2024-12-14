import { CorrectSentence } from "./quizModel"

// const xAxisWords: XAxisWords = [
//     "eat",
//     "drink",
//     "sleep",
//     "run",
//     "walk",
//     "study",
//     "use",
//     "watch",
//     "listen",
//     "buy",
//   ];
//   const yAxisWords: YAxisWords = ["I", "He", "She", "You", "They", "We"];

export type SentenceManager = {
    [key:string]:CorrectSentence
}

const sentenceManager:SentenceManager = {
    "Ieat":{sentence:["I", "eat", "rice", "everyday"], type:"correct"},
    "Idrink":{sentence:["I", "drink", "tea", "everyday"], type:"correct"},
    "Isleep":{sentence:["I", "sleep", "at", "10:00", "pm"], type:"correct"},
    "Irun":{sentence:["I", "run", "at", "the", "ground"], type:"correct"},
    "Iwalk":{sentence:["I", "walk", "to", "school"], type:"correct"},
    "Istudy":{sentence:["I", "study", "English", "everyday"], type:"correct"},
    "Iuse":{sentence:["I", "use", "a", "pencil", "at", "school"], type:"correct"},
    "Iwatch":{sentence:["I", "watch", "Youtube", "at", "home"], type:"correct"},
    "Ilisten":{sentence:["I", "listen", "to", "music", "everyday"], type:"correct"},
    "Ibuy":{sentence:["I", "buy", "snacks", "at", "the", "store"], type:"correct"},
}

export default sentenceManager