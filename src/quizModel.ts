import { XAxisWords, XWord, YAxisWords, YWord } from "./model";
import sentenceManager, { SentenceManager } from "./sentences";

export type CorrectSentence = { sentence: string[]; type: "correct" };
export type ScrambledSentence = { sentence: string[]; type: "scrambled" };
export type UserSentence = { sentence: string[]; type: "user" };
// export type NoSentence = {type:"Empty"}
export type Sentence = CorrectSentence | ScrambledSentence | UserSentence 

const quizModel = (sentenceManager:SentenceManager) => {
  let currentQuiz: ScrambledSentence;
  let correctAnswer: CorrectSentence;
  let userAnswer: UserSentence = {};

  const startQuiz = (yWord: YWord, xWord: XWord) => {};

  const getSentence = (yWord: YWord, xWord: XWord): CorrectSentence | undefined => {
    return sentenceManager[yWord+xWord]
  };

  const createScrambledSentence = (
    sentence: CorrectSentence,
  ): ScrambledSentence => {
    const words = sentence.sentence

    for (let i = words.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [words[i], words[j]] = [words[j] as string, words[i] as string]; 
      } 
      return {sentence:[...words], type:"scrambled"}
  };

  const makeQuiz = (
    quiz: ScrambledSentence,
    answer: CorrectSentence,
  ): void => {};

  const pickWord = (index: number, currentQuiz: ScrambledSentence): void => {};

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
  };
};

export default quizModel(sentenceManager);
