import { eventEmitter } from "eventlistenerhelper";
import quizModel, { ScrambledSentence, UserAnswer } from "./quizModel";
import sentenceManager from "./sentences";

export type Player = {
  playerId: 1 | 2;
  color: Color;
};

export type CurrentPlayer = Player;

export type EmptyTile = {
  playerId: "empty";
  color: "nocolor";
  canInsert: boolean;
  sentence: Sentence;
};

export type PickedTile = {
  playerId: PlayerId;
  color: Color;
  canInsert: false;
};

export type Tile = EmptyTile | PickedTile;

export type XAxisNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type YAxisNumber = 0 | 1 | 2 | 3 | 4 | 5;

const xWords = [
  "eat",
  "drink",
  "sleep",
  "run",
  "walk",
  "study",
  "use",
  "watch",
  "listen",
  "buy",
] as const;

export type XWord = (typeof xWords)[number];

export type XAxisWords = [
  XWord,
  XWord,
  XWord,
  XWord,
  XWord,
  XWord,
  XWord,
  XWord,
  XWord,
  XWord,
];

const yWords = ["I", "He", "She", "You", "They", "We"] as const;

export type YWord = (typeof yWords)[number];

export type YAxisWords = [YWord, YWord, YWord, YWord, YWord, YWord];

export type GameBoard = [
  [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile],
  [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile],
  [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile],
  [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile],
  [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile],
  [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile],
];

export type Color =
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "black"
  | "orange"
  | "white"
  | "blue"
  | "nocolor";
export type TileColor = Color | "nocolor";

export type Sentence = [YWord, XWord];

export type GameStatus = "playing" | "setUp" | "gameover";

export type PlayerId = 1 | 2;

export type FourCoodinates = [
  [YAxisNumber, XAxisNumber],
  [YAxisNumber, XAxisNumber],
  [YAxisNumber, XAxisNumber],
  [YAxisNumber, XAxisNumber],
];

export type Winner = {
  coordinates: FourCoodinates;
  player: Player;
  winner: "winner";
};

export type NoWinner = false;

export type GameResult = Winner | NoWinner;

const xAxisWords: XAxisWords = [
  "eat",
  "drink",
  "sleep",
  "run",
  "walk",
  "study",
  "use",
  "watch",
  "listen",
  "buy",
];

const yAxisWords: YAxisWords = ["I", "He", "She", "You", "They", "We"];

const playerOne: Player = {
  playerId: 1,
  color: "blue",
};

const playerTwo: Player = {
  playerId: 2,
  color: "red",
};

const players = {
  1: playerOne,
  2: playerTwo,
};

let currentPlayer: CurrentPlayer = playerOne;

let gameBoard: GameBoard;

const gameStatus = new Set<"quiz" | "game" | "end">();

let currentEmptyTile: [YAxisNumber, XAxisNumber];

const setCurrentPlayer = (playerId: PlayerId) =>
  (currentPlayer = players[playerId]);

const getCurrentPlayer = () => currentPlayer;

const arePlayersSameColor = (playerId: PlayerId, color: Color) => {
  const newPlayers = { ...players };
  const otherPlayerId = playerId === 1 ? 2 : 1;
  newPlayers[playerId].color = color;
  return newPlayers[playerId].color === newPlayers[otherPlayerId].color;
};

const setPlayerColor = (playerId: PlayerId, color: Color) => {
  if (arePlayersSameColor(playerId, color)) return;
  players[playerId] = { ...players[playerId], color };
  eventEmitter.emitEvent("choseColor", { ...players[playerId] });
  eventEmitter.emitEvent("disallowSameColor", getPlayers());
};
const getPlayers = () => players;

const createTile = (firstWord: YWord, secondWord: XWord): EmptyTile => ({
  color: "nocolor",
  canInsert: false,
  sentence: [firstWord, secondWord],
  playerId: "empty",
});

const createGameGrid = (xWords: XAxisWords, yWords: YAxisWords): GameBoard => {
  return yWords.map((yword, yIndex) => {
    const row: Tile[] = [];

    xWords.forEach((xword) => {
      const tile: Tile = createTile(yword, xword);
      if (yIndex === 0) tile.canInsert = true;
      row.push(tile);
    });

    return row;
  }) as GameBoard;
};

const findTile = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
): Tile => gameBoard[targetY][targetX];

const checkHorizontalLine = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  playerId: 1 | 2,
): GameResult =>
  isHorizontalLineWinner(targetY, targetX, gameBoard, 0, playerId) ||
  isHorizontalLineWinner(targetY, targetX, gameBoard, -1, playerId) ||
  isHorizontalLineWinner(targetY, targetX, gameBoard, -2, playerId) ||
  isHorizontalLineWinner(targetY, targetX, gameBoard, -3, playerId);

const checkVerticalLine = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  playerId: 1 | 2,
): GameResult =>
  isVerticalLineWinner(targetY, targetX, gameBoard, 0, playerId) ||
  isVerticalLineWinner(targetY, targetX, gameBoard, -1, playerId) ||
  isVerticalLineWinner(targetY, targetX, gameBoard, -2, playerId) ||
  isVerticalLineWinner(targetY, targetX, gameBoard, -3, playerId);

const checkDiagonalLine = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  playerId: 1 | 2,
): GameResult =>
  isDiagonalLineWinner(targetY, targetX, gameBoard, 0, playerId) ||
  isDiagonalLineWinner(targetY, targetX, gameBoard, -1, playerId) ||
  isDiagonalLineWinner(targetY, targetX, gameBoard, -2, playerId) ||
  isDiagonalLineWinner(targetY, targetX, gameBoard, -3, playerId) ||
  isOppositeDiagonalLineWinner(targetY, targetX, gameBoard, 0, playerId) ||
  isOppositeDiagonalLineWinner(targetY, targetX, gameBoard, -1, playerId) ||
  isOppositeDiagonalLineWinner(targetY, targetX, gameBoard, -2, playerId) ||
  isOppositeDiagonalLineWinner(targetY, targetX, gameBoard, -3, playerId);

export type CounterNumber = 0 | -1 | -2 | -3;

const isHorizontalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): GameResult => {
  const coordinates: [YAxisNumber, XAxisNumber][] = [];

  for (let x = counter + targetX; x <= 3 + counter + targetX; x++) {
    if (!isHLineWithinGameBoard(x)) return false;
    const tile: Tile = findTile(targetY, x, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;

    coordinates.push([targetY, x]);
  }
  return {
    coordinates: coordinates as FourCoodinates,
    winner: "winner",
    player: getCurrentPlayer(),
  };
};

const isVerticalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): GameResult => {
  const coordinates: [YAxisNumber, XAxisNumber][] = [];

  for (let y = counter + targetY; y <= 3 + counter + targetY; y++) {
    if (!isVLineWithinGameBoard(y)) return false;
    const tile: Tile = findTile(y, targetX, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;

    coordinates.push([y, targetX]);
  }
  return {
    coordinates: coordinates as FourCoodinates,
    winner: "winner",
    player: getCurrentPlayer(),
  };
};

const isDiagonalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): GameResult => {
  let startingX: number = targetX + counter;
  let startingY: number = targetY + counter;

  const coordinates: [YAxisNumber, XAxisNumber][] = [];

  for (let index = 0; index <= 3; index++) {
    if (
      !isVLineWithinGameBoard(startingY) ||
      !isHLineWithinGameBoard(startingX)
    )
      return false;

    const tile: Tile = findTile(startingY, startingX, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;

    coordinates.push([startingY, startingX]);

    startingX++;
    startingY++;
  }

  return {
    coordinates: coordinates as FourCoodinates,
    winner: "winner",
    player: getCurrentPlayer(),
  };
};

const isOppositeDiagonalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): GameResult => {
  let startingX: number = targetX + counter;
  let startingY: number = targetY + -counter;

  const coordinates: [YAxisNumber, XAxisNumber][] = [];

  for (let index = 0; index <= 3; index++) {
    if (
      !isVLineWithinGameBoard(startingY) ||
      !isHLineWithinGameBoard(startingX)
    )
      return false;


    const tile: Tile = findTile(startingY, startingX, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;

    coordinates.push([startingY, startingX]);

    startingX++;
    startingY--;
  }

  return {
    coordinates: coordinates as FourCoodinates,
    winner: "winner",
    player: getCurrentPlayer(),
  };
};

const isHLineWithinGameBoard = (targetX: number): targetX is XAxisNumber =>
  targetX >= 0 && targetX <= 9;
const isVLineWithinGameBoard = (targetY: number): targetY is YAxisNumber =>
  targetY >= 0 && targetY <= 5;

const getGameBoard = () => gameBoard;
const setGameBoard = (newGameBoard: GameBoard) => {
  gameBoard = newGameBoard;
};

const canInsertToken = (tile: Tile): tile is EmptyTile =>
  tile.playerId === "empty" && tile.canInsert;

const isAboveTileInsertable = (
  y: YAxisNumber,
  x: XAxisNumber,
  gameBoard: GameBoard,
) => {
  if (y + 1 > 5) return false;
  const aboveTile: Tile = gameBoard[(y + 1) as YAxisNumber][x];
  if (aboveTile.playerId === "empty") return true;
  return false;
};

const insertToken = (
  x: XAxisNumber,
  y: YAxisNumber,
  newGameBoard: GameBoard,
  player: Player,
) => {
  const pickedTile: PickedTile = {
    playerId: player.playerId,
    color: player.color,
    canInsert: false,
  };

  newGameBoard[y][x] = pickedTile;

  gameBoard = newGameBoard;

  return gameBoard;
};

const makeTileInsertable = (
  x: XAxisNumber,
  y: YAxisNumber,
  newGameBoard: GameBoard,
) => {
  const newY: YAxisNumber = (y + 1) as YAxisNumber;
  newGameBoard[newY][x].canInsert = true;
  gameBoard = newGameBoard;
};

const decideFirstPlayer = () => {
  const ranNum: PlayerId = (Math.floor(Math.random() * 2) + 1) as PlayerId;
  currentPlayer = players[ranNum];
};

const startGame = () => {
  const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  setGameBoard(gameBoard);
  decideFirstPlayer();
};

const pickTile = (y: YAxisNumber, x: XAxisNumber) => {
  if (gameStatus.has("quiz")) return 
  const gameBoard = getGameBoard();
  const tile: Tile = findTile(y, x, gameBoard);
  if (!canInsertToken(tile))
    return eventEmitter.emitEvent("invalidMove", [y, x]);

  //TODO Check here if the token will be a winner
  const player = getCurrentPlayer();
  const newGameBoard = insertToken(x, y, gameBoard, player);
  const gameResult: GameResult = checkWinner(
    x,
    y,
    newGameBoard,
    player.playerId,
  );
  if (gameResult) {
    eventEmitter.emitEvent("insertToken", { color: player.color, x, y });
    eventEmitter.emitEvent("gameSet", gameResult)
    eventEmitter.emitEvent("flashTokens", gameResult.coordinates)
    return
  }
  //
  setCurrentEmptyTile(y, x);
  startQuiz(tile);
  return
  //TODO Delete this when able
  // const player = getCurrentPlayer();
  // const newGameBoard = insertToken(x, y, gameBoard, player);
  //  const gameResult: GameResult = checkWinner(
  //   x,
  //   y,
  //   newGameBoard,
  //   player.playerId,
  // );
  // if (gameResult) {
  //   eventEmitter.emitEvent("insertToken", { color: player.color, x, y });
  //   eventEmitter.emitEvent("gameSet", gameResult)
  //   eventEmitter.emitEvent("flashTokens", gameResult.coordinates)
  //   return
  // }
  // eventEmitter.emitEvent("insertToken", { color: player.color, x, y });

  // if (isAboveTileInsertable(y, x, newGameBoard))
  //   makeTileInsertable(x, y, newGameBoard);

  
  // changePlayers();
  // gameStatus.delete("quiz");
};

const setCurrentEmptyTile = (y: YAxisNumber, x: XAxisNumber) => {
  currentEmptyTile = [y, x];
};
const getCurrentEmptyTile = () => currentEmptyTile;

const putTokenInTile = () => {
  const [y, x] = getCurrentEmptyTile();
  const currentPlayer = getCurrentPlayer()
  const newGameBoard = getGameBoard();
  eventEmitter.emitEvent("insertToken", { color: currentPlayer.color, x, y });
 
  if (isAboveTileInsertable(y, x, newGameBoard))
    makeTileInsertable(x, y, newGameBoard);

  changePlayers();
  gameStatus.delete("quiz");
};

//TODO Maybe place this in the controller?
eventEmitter.subscribe("quizFinished", putTokenInTile);

const changePlayers = () =>
  (currentPlayer = currentPlayer.playerId === 1 ? players[2] : players[1]);

//! Return 4 coordinates that make a row
//? Winner
const checkWinner = (
  x: XAxisNumber,
  y: YAxisNumber,
  gameBoard: GameBoard,
  playerId: PlayerId,
): GameResult =>
  checkVerticalLine(y, x, gameBoard, playerId) ||
  checkHorizontalLine(y, x, gameBoard, playerId) ||
  checkDiagonalLine(y, x, gameBoard, playerId);

const getAxisWords = (): [XAxisWords, YAxisWords] => [xAxisWords, yAxisWords];

const startQuiz = (tile: EmptyTile) => {
  gameStatus.add("quiz");
  const [yWord, xWord]: [YWord, XWord] = tile.sentence;
  quizModel.startQuiz(yWord, xWord);
};

// Abstractions for quizModel pickWord and unpickWord methods
const pickWord = ((
  pickWord: (index: number, currentQuiz: ScrambledSentence) => void,
) => pickWord)(quizModel.pickWord);

const unpickWord = ((
  unpickWord: (index: number, userAnswer: UserAnswer) => void,
) => unpickWord)(quizModel.unpickWord);

export type Model = {
  getAxisWords: () => [XAxisWords, YAxisWords];
  pickTile: (
    targetY: YAxisNumber,
    targetX: XAxisNumber,
    gameBoard: GameBoard,
  ) => void;
  getGameBoard: () => GameBoard;
  startGame: () => void;
  setPlayerColor: (playerId: PlayerId, color: Color) => void;
  getPlayers: () => { 1: Player; 2: Player };
  pickWord: (index: number, currentQuiz: ScrambledSentence) => void;
  unpickWord: (index: number, userAnswer: UserAnswer) => void;
  getCurrentPlayer:()=>Player
};

const model: Model = {
  getAxisWords,
  pickTile,
  getGameBoard,
  startGame,
  setPlayerColor,
  getPlayers,
  pickWord,
  unpickWord,
  getCurrentPlayer
};

// startGame()
// pickTile(0,0)
// // console.log(gameBoard)
// console.log(quizModel.getCorrectAnswer().words)
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(gameBoard)

export default model;

export {
  getCurrentPlayer,
  setCurrentPlayer,
  setPlayerColor,
  getPlayers,
  createTile,
  createGameGrid,
  isHorizontalLineWinner,
  isVerticalLineWinner,
  isDiagonalLineWinner,
  isOppositeDiagonalLineWinner,
  isHLineWithinGameBoard,
  findTile,
  checkHorizontalLine,
  checkVerticalLine,
  checkDiagonalLine,
  insertToken,
  getGameBoard,
  setGameBoard,
  makeTileInsertable,
  isAboveTileInsertable,
  getAxisWords,
};

// startGame()
// pickTile(0,0)
// // console.log(gameBoard)
// console.log(quizModel.getCorrectAnswer().words)
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(pickWord(0, quizModel.getCurrentQuiz()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(unpickWord(0, quizModel.getUserAnswer()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
// console.log(unpickWord(2, quizModel.getUserAnswer()))
// console.log(quizModel.getCurrentQuiz().words)
// console.log(quizModel.getUserAnswer().words)
