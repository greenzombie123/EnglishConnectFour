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
    "Ieat":{words:["I", "eat", "rice", "everyday"], type:"correct", translation:"私は毎日ライスを食べる"},
    "Idrink":{words:["I", "drink", "tea", "everyday"], type:"correct", translation:"私は毎日お茶を飲む"},
    "Isleep":{words:["I", "sleep", "at", "10:00", "pm"], type:"correct", translation:"私は午後10時に寝る"},
    "Irun":{words:["I", "run", "at", "the", "ground"], type:"correct", translation:"私はグラウンドで走る"},
    "Iwalk":{words:["I", "walk", "to", "school"], type:"correct", translation:"私は歩いて学校に行く"},
    "Istudy":{words:["I", "study", "English", "everyday"], type:"correct", translation:"私は毎日英語を勉強している"},
    "Iuse":{words:["I", "use", "a", "pencil", "at", "school"], type:"correct", translation:"私は学校で鉛筆を使う"},
    "Iwatch":{words:["I", "watch", "Youtube", "at", "home"], type:"correct", translation:"私は家でYoutubeを見る"},
    "Ilisten":{words:["I", "listen", "to", "music", "everyday"], type:"correct", translation:"私は毎日音楽を聴いている"},
    "Ibuy":{words:["I", "buy", "snacks", "at", "the", "store"], type:"correct", translation:"私はお店でおやつを買う"},
}

export default sentenceManager