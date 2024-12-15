import { XAxisWords, XWord, YAxisWords, YWord } from "./model";
import sentenceManager, { SentenceManager } from "./sentences";

export type CorrectSentence = {
  words: string[];
  type: "correct";
  translation: string;
};
export type ScrambledSentence = { words: string[]; type: "scrambled" };
export type UserAnswer = { words: string[]; type: "user" };
export type Sentence = CorrectSentence | ScrambledSentence | UserAnswer;

const quizModel = (sentenceManager: SentenceManager) => {
  let currentQuiz: ScrambledSentence;
  let correctAnswer: CorrectSentence;
  let userAnswer: UserAnswer = { words: [], type: "user" };

  const startQuiz = (yWord: YWord, xWord: XWord) => {};

  const getSentence = (
    yWord: YWord,
    xWord: XWord,
  ): CorrectSentence | undefined => {
    return sentenceManager[yWord + xWord];
  };

  const createScrambledSentence = (
    sentence: CorrectSentence,
  ): ScrambledSentence => {
    const words = sentence.words;

    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j] as string, words[i] as string];
    }
    return { words: [...words], type: "scrambled" };
  };

  const makeQuiz = (quiz: ScrambledSentence, answer: CorrectSentence): void => {
    currentQuiz = { ...quiz };
    correctAnswer = { ...answer };
  };

  const getWord = (index: number, sentence: Sentence): string | undefined =>
    sentence.words[index];

  const removeWord = <T extends Sentence>(index: number, sentence: T): T => {
    const newSentence = {...sentence}
    newSentence.words = newSentence.words.filter((word, i) => i !== index);
    return newSentence
  };

  const setUserAnswer = (answer: UserAnswer, word: string|undefined ) => {
    const newUserAnswer: UserAnswer = { ...answer };
    if(word) newUserAnswer.words.push(word);
    userAnswer = { ...newUserAnswer };
  };

  const setScrambledSentence = (scrambled: ScrambledSentence,word: string|undefined) => {
    const newScrambled: ScrambledSentence = { ...scrambled };
    if(word) newScrambled.words.push(word);
    currentQuiz = { ...newScrambled };
  };

  const isAnswerCorrect = (
    userAnswer: UserAnswer,
    answer: CorrectSentence,
  ): boolean => {
    if (userAnswer.words.length !== answer.words.length) return false;
    const length = userAnswer.words.length;
    for (let index = 0; index < length; index++) {
      if (userAnswer.words[index] !== answer.words[index]) return false;
    }
    return true;
  };

  const pickWord = (index: number, currentQuiz: ScrambledSentence): void => {
    const userAnswer = getUserAnswer()
    const pickedWord:string|undefined = getWord(index, currentQuiz)
    const sentence:ScrambledSentence = removeWord(index, currentQuiz)
    setUserAnswer(userAnswer, pickedWord)
    setScrambledSentence(sentence, undefined)
  };

  const unpickWord = (index: number, userAnswer: UserAnswer): void => {
    const quiz = getCurrentQuiz()
    const pickedWord:string|undefined = getWord(index, userAnswer)
    const sentence:Sentence = removeWord(index, userAnswer)
    setUserAnswer(sentence, undefined)
    setScrambledSentence(quiz, pickedWord)
  };

  const getUserAnswer = (): UserAnswer => userAnswer;

  const getCorrectAnswer = (): CorrectSentence => correctAnswer;

  const getCurrentQuiz = (): ScrambledSentence => currentQuiz;

  const isUserAnswerReady = (
    userAnswer: UserAnswer,
    answer: CorrectSentence,
  ): boolean => userAnswer.words.length === answer.words.length;

  return {
    startQuiz,
    getSentence,
    createScrambledSentence,
    makeQuiz,
    pickWord,
    getUserAnswer,
    getCorrectAnswer,
    isUserAnswerReady,
    getWord,
    removeWord,
    setUserAnswer,
    setScrambledSentence,
    isAnswerCorrect,
    unpickWord,
    getCurrentQuiz
  };
};

export default quizModel(sentenceManager);
