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
    "Ieat":{sentence:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"},
    "Idrink":{sentence:["I", "drink", "tea", "everyday"], type:"correct", translation:"私は毎日お茶を飲む"},
    "Isleep":{sentence:["I", "sleep", "at", "10:00", "pm"], type:"correct", translation:"私は午後10時に寝る"},
    "Irun":{sentence:["I", "run", "at", "the", "ground"], type:"correct", translation:"私はグラウンドで走る"},
    "Iwalk":{sentence:["I", "walk", "to", "school"], type:"correct", translation:"私は歩いて学校に行く"},
    "Istudy":{sentence:["I", "study", "English", "everyday"], type:"correct", translation:"私は毎日英語を勉強している"},
    "Iuse":{sentence:["I", "use", "a", "pencil", "at", "school"], type:"correct", translation:"私は学校で鉛筆を使う"},
    "Iwatch":{sentence:["I", "watch", "Youtube", "at", "home"], type:"correct", translation:"私は家でYoutubeを見る"},
    "Ilisten":{sentence:["I", "listen", "to", "music", "everyday"], type:"correct", translation:"私は毎日音楽を聴いている"},
    "Ibuy":{sentence:["I", "buy", "snacks", "at", "the", "store"], type:"correct", translation:"私はお店でおやつを買う"},
}

export default sentenceManager