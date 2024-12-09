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

export type XAxisNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 ;

export type YAxisNumber = 0 | 1 | 2 | 3 | 4 | 5;

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

const pickTile = ()=>{

}

const findTile = (targetY:YAxisNumber, targetX:XAxisNumber, gameBoard:GameBoard):Tile=>gameBoard[targetY][targetX]

const checkHorizontalLine = ():boolean=> {}

export type CounterNumber = 0 | -1 | -2 | -3

const isHorizontalLineWinner = (targetY:YAxisNumber, targetX:XAxisNumber, gameBoard:GameBoard, counter:CounterNumber, currentPlayerId:1|2 ):boolean=> {

    for (let x = (counter + targetX); x <= (3 + counter + targetX); x++) {
        if(!isHLineWithinGameBoard(x)) return false
        const tile:Tile = findTile(targetY, x, gameBoard)
        if(tile.playerId !== currentPlayerId) return false
    }

    return true
}

const isVerticalLineWinner = (targetY:YAxisNumber, targetX:XAxisNumber, gameBoard:GameBoard, counter:CounterNumber ):boolean=> {}

const isDiagonalLineWinner = (targetY:YAxisNumber, targetX:XAxisNumber, gameBoard:GameBoard, counter:CounterNumber ):boolean=> {}

const isHLineWithinGameBoard = (targetX:number):targetX is XAxisNumber => targetX >= 0 && targetX <= 9
const isVLineWithinGameBoard = (targetY:number):boolean=> targetY >= 0 && targetY <= 5




export {
  getCurrentPlayer,
  setCurrentPlayer,
  setPlayerColor,
  getPlayers,
  createTile,
  createGameGrid,
  isHorizontalLineWinner,
  isHLineWithinGameBoard,
  findTile
};
