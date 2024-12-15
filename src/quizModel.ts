import { XAxisWords, XWord, YAxisWords, YWord } from "./model";
import sentenceManager, { SentenceManager } from "./sentences";

export type CorrectSentence = { words: string[]; type: "correct", translation:string };
export type ScrambledSentence = { words: string[]; type: "scrambled" };
export type UserAnswer= { words: string[]; type: "user" };
// export type NoSentence = {type:"Empty"}
export type Sentence = CorrectSentence | ScrambledSentence | UserAnswer 

const quizModel = (sentenceManager:SentenceManager) => {
  let currentQuiz: ScrambledSentence;
  let correctAnswer: CorrectSentence;
  let userAnswer: UserAnswer = {words:[], type:"user"}

  const startQuiz = (yWord: YWord, xWord: XWord) => {};

  const getSentence = (yWord: YWord, xWord: XWord): CorrectSentence | undefined => {
    return sentenceManager[yWord+xWord]
  };

  const createScrambledSentence = (
    sentence: CorrectSentence,
  ): ScrambledSentence => {
    const words = sentence.words

    for (let i = words.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [words[i], words[j]] = [words[j] as string, words[i] as string]; 
      } 
      return {words:[...words], type:"scrambled"}
  };

  const makeQuiz = (
    quiz: ScrambledSentence,
    answer: CorrectSentence,
  ): void => {
    currentQuiz = {...quiz}
    correctAnswer = {...answer}
  };

  const getWord = (index: number, sentence: Sentence):string|undefined=> sentence.words[index]

  const removeWord = (index: number, sentence: Sentence):Sentence=>{} 

  const setUserAnswer = (word:string, userAnswer:UserAnswer)=>{}

  const setScrambledSentence = (word:string, scrambled:ScrambledSentence)=>{}

  const isSentenceMatch = (userAnswer:UserAnswer, answer:CorrectSentence):boolean=>{}

  const pickWord = (index: number, currentQuiz: ScrambledSentence): void => {};

  const unpickWord = (index: number, userAnswer: UserSentence): void => {};

  const getAnswer = (): UserSentence => {};

  const getCorrectAnswer = (): CorrectSentence => {};

  const isUserAnswerReady = (
    userAnswer: UserSentence,
    answer: CorrectSentence,
  ): boolean => {};

  const isAnswerCorrect = (
    userAnswer: UserSentence,
    answer: CorrectSentence,
  ): boolean => {};

  return {
    startQuiz,
    getSentence,
    createScrambledSentence,
    makeQuiz,
    pickWord,
    getAnswer,
    getCorrectAnswer,
    isUserAnswerReady,
    isAnswerCorrect,
    getWord,
    removeWord,
    setUserAnswer,
    setScrambledSentence,
    isSentenceMatch,
    unpickWord
  };
};

export default quizModel(sentenceManager);
