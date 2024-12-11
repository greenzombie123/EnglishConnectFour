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
    string
];
export type YAxisWords = [string, string, string, string, string, string];
export type GameBoard = [
    [
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile
    ],
    [
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile
    ],
    [
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile
    ],
    [
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile
    ],
    [
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile
    ],
    [
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile,
        Tile
    ]
];
export type Color = "red" | "green" | "yellow" | "purple" | "black" | "orange" | "white" | "blue" | "nocolor";
export type TileColor = Color | "nocolor";
export type Sentence = string[];
export type GameStatus = "playing" | "setUp" | "gameover";
export type PlayerId = 1 | 2;
declare const setCurrentPlayer: (playerId: PlayerId) => Player;
declare const getCurrentPlayer: () => Player;
declare const setPlayerColor: (playerId: PlayerId, color: Color) => {
    color: Color;
    playerId: 1 | 2;
};
declare const getPlayers: () => {
    1: Player;
    2: Player;
};
declare const createTile: (firstWord: string, secondWord: string) => EmptyTile;
declare const createGameGrid: (xWords: XAxisWords, yWords: YAxisWords) => GameBoard;
declare const findTile: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard) => Tile;
declare const checkHorizontalLine: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, playerId: 1 | 2) => boolean;
declare const checkVerticalLine: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, playerId: 1 | 2) => boolean;
declare const checkDiagonalLine: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, playerId: 1 | 2) => boolean;
export type CounterNumber = 0 | -1 | -2 | -3;
declare const isHorizontalLineWinner: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, counter: CounterNumber, currentPlayerId: 1 | 2) => boolean;
declare const isVerticalLineWinner: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, counter: CounterNumber, currentPlayerId: 1 | 2) => boolean;
declare const isDiagonalLineWinner: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, counter: CounterNumber, currentPlayerId: 1 | 2) => boolean;
declare const isOppositeDiagonalLineWinner: (targetY: YAxisNumber, targetX: XAxisNumber, gameBoard: GameBoard, counter: CounterNumber, currentPlayerId: 1 | 2) => boolean;
declare const isHLineWithinGameBoard: (targetX: number) => targetX is XAxisNumber;
declare const getGameBoard: () => GameBoard;
declare const setGameBoard: (newGameBoard: GameBoard) => void;
declare const isAboveTileInsertable: (y: YAxisNumber, x: XAxisNumber, gameBoard: GameBoard) => boolean;
declare const insertToken: (x: XAxisNumber, y: YAxisNumber, newGameBoard: GameBoard, player: Player) => GameBoard;
declare const makeTileInsertable: (x: XAxisNumber, y: YAxisNumber, newGameBoard: GameBoard) => void;
declare const getAxisWords: () => [XAxisWords, YAxisWords];
export type Model = {
    getAxisWords: () => [XAxisWords, YAxisWords];
};
declare const model: Model;
export default model;
export { getCurrentPlayer, setCurrentPlayer, setPlayerColor, getPlayers, createTile, createGameGrid, isHorizontalLineWinner, isVerticalLineWinner, isDiagonalLineWinner, isOppositeDiagonalLineWinner, isHLineWithinGameBoard, findTile, checkHorizontalLine, checkVerticalLine, checkDiagonalLine, insertToken, getGameBoard, setGameBoard, makeTileInsertable, isAboveTileInsertable, getAxisWords };
