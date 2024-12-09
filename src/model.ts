export type Player = {
  playerId: 1 | 2;
  color: Color;
};

export type CurrentPlayer = Player;

export type Tile = {
  playerId: 1 | 2 | "empty";
  color: TileColor;
  canInsert: boolean;
  sentence: Sentence;
};

export type XAxisNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type YAxisNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type XAxisWords = [string, string, string, string, string, string, string, string, string, string];

export type YAxisWords = [string, string, string, string, string, string]

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
  | "blue";
export type TileColor = Color | "nocolor";

export type Sentence = string[];

export type GameStatus = "playing" | "setUp" | "gameover";

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

const setCurrentPlayer = (number: 1 | 2) => (currentPlayer = players[number]);

const getCurrentPlayer = () => currentPlayer;

const setPlayerColor = (number: 1 | 2, color: Color) =>
  (players[number] = { ...players[number], color });

const getPlayers = () => players;

const createTile = (firstWord: string, secondWord: string): Tile => ({
  playerId: "empty",
  color: "nocolor",
  canInsert: false,
  sentence: [firstWord, secondWord],
});

const createSentence = (firstWord: string, secondWord: string) => [
  firstWord,
  secondWord,
];

const createGameGrid = (xWords:XAxisWords,yWords:YAxisWords):GameBoard => {
   

    return yWords.map((yword)=>{
        const row:Tile[] = []
    
        xWords.forEach((xword)=>{

            const tile:Tile = createTile(yword, xword)
            row.push(tile)
        })

        return row
    }) as GameBoard
};

const changePlayers = ()=>{}

const pickTile = ()=>{}

const findTile = (targetY:YAxisNumber, targetX:XAxisNumber, gameBoard:GameBoard):Tile=>{}

const checkHorizontalLine = ()=> {}

const isHorizontalLineWinner = (targetY:YAxisNumber, targetX:XAxisNumber, gameBoard:GameBoard ):boolean=> {}

export type CounterNumber = 0 | -1 | -2 | -3

const isHLineWithinGameBoard = (targetY:YAxisNumber, targetX:XAxisNumber,  gameBoard:GameBoard,  counter:CounterNumber):boolean=>{}


export {
  getCurrentPlayer,
  setCurrentPlayer,
  setPlayerColor,
  getPlayers,
  createTile,
  createGameGrid,
  isHorizontalLineWinner,
  isHLineWithinGameBoard
};
