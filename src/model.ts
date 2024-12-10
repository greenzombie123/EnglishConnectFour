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

export type XAxisWords = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type YAxisWords = [string, string, string, string, string, string];

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

export type Sentence = string[];

export type GameStatus = "playing" | "setUp" | "gameover";

export type PlayerId = 1 | 2;

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

const setCurrentPlayer = (playerId: PlayerId) =>
  (currentPlayer = players[playerId]);

const getCurrentPlayer = () => currentPlayer;

const setPlayerColor = (playerId: PlayerId, color: Color) =>
  (players[playerId] = { ...players[playerId], color });

const getPlayers = () => players;

const createTile = (firstWord: string, secondWord: string): EmptyTile => ({
  color: "nocolor",
  canInsert: false,
  sentence: [firstWord, secondWord],
  playerId: "empty",
});

const createSentence = (firstWord: string, secondWord: string) => [
  firstWord,
  secondWord,
];

const createGameGrid = (xWords: XAxisWords, yWords: YAxisWords): GameBoard => {
  return yWords.map((yword) => {
    const row: Tile[] = [];

    xWords.forEach((xword) => {
      const tile: Tile = createTile(yword, xword);
      row.push(tile);
    });

    return row;
  }) as GameBoard;
};

const startGame = () => {};

const makeLowestRowInsertable = (oldGameBoard: GameBoard) => {
  oldGameBoard[0] = oldGameBoard[0].map((tile) => {
    tile.canInsert = true;
    return tile;
  }) as [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile,]

  gameBoard = oldGameBoard
};

const pickTile = () => {};

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
): boolean =>
  isHorizontalLineWinner(targetY, targetX, gameBoard, 0, playerId) ||
  isHorizontalLineWinner(targetY, targetX, gameBoard, -1, playerId) ||
  isHorizontalLineWinner(targetY, targetX, gameBoard, -2, playerId) ||
  isHorizontalLineWinner(targetY, targetX, gameBoard, -3, playerId);

const checkVerticalLine = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  playerId: 1 | 2,
): boolean =>
  isVerticalLineWinner(targetY, targetX, gameBoard, 0, playerId) ||
  isVerticalLineWinner(targetY, targetX, gameBoard, -1, playerId) ||
  isVerticalLineWinner(targetY, targetX, gameBoard, -2, playerId) ||
  isVerticalLineWinner(targetY, targetX, gameBoard, -3, playerId);

const checkDiagonalLine = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  playerId: 1 | 2,
): boolean =>
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
): boolean => {
  for (let x = counter + targetX; x <= 3 + counter + targetX; x++) {
    if (!isHLineWithinGameBoard(x)) return false;
    const tile: Tile = findTile(targetY, x, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;
  }

  return true;
};

const isVerticalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): boolean => {
  for (let y = counter + targetY; y <= 3 + counter + targetY; y++) {
    if (!isVLineWithinGameBoard(y)) return false;
    const tile: Tile = findTile(y, targetX, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;
  }

  return true;
};

const isDiagonalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): boolean => {
  let startingX: number = targetX + counter;
  let startingY: number = targetY + counter;

  for (let index = 0; index <= 3; index++) {
    if (
      !isVLineWithinGameBoard(startingY) ||
      !isHLineWithinGameBoard(startingX)
    )
      return false;

    const tile: Tile = findTile(startingY, startingX, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;

    startingX++;
    startingY++;
  }

  return true;
};

const isOppositeDiagonalLineWinner = (
  targetY: YAxisNumber,
  targetX: XAxisNumber,
  gameBoard: GameBoard,
  counter: CounterNumber,
  currentPlayerId: 1 | 2,
): boolean => {
  let startingX: number = targetX + counter;
  let startingY: number = targetY + counter;

  for (let index = 0; index <= 3; index++) {
    if (
      !isVLineWithinGameBoard(startingY) ||
      !isHLineWithinGameBoard(startingX)
    )
      return false;

    const tile: Tile = findTile(startingY, startingX, gameBoard);
    if (tile.playerId !== currentPlayerId) return false;

    startingX--;
    startingY++;
  }

  return true;
};

const isHLineWithinGameBoard = (targetX: number): targetX is XAxisNumber =>
  targetX >= 0 && targetX <= 9;
const isVLineWithinGameBoard = (targetY: number): targetY is YAxisNumber =>
  targetY >= 0 && targetY <= 5;

const getGameBoard = () => gameBoard;
const setGameBoard = (newGameBoard: GameBoard) => {
  gameBoard = newGameBoard;
};

const canInsertToken = (tile: Tile): boolean => tile.playerId === "empty" && tile.canInsert;

const isAboveTileInsertable = (y:YAxisNumber, x:XAxisNumber, gameBoard:GameBoard)=>{
  if(y + 1 > 6) return false
  const aboveTile:Tile = gameBoard[(y+1) as YAxisNumber][x]
  if(aboveTile.playerId === "empty") return true
  return false
}

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
};

const makeTileInsertable = ()=>{
  
}

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
  makeLowestRowInsertable,
  makeTileInsertable,
  isAboveTileInsertable
};
