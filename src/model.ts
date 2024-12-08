export type Player = {
	playerId:1 | 2,
	color:Color
}

export type CurrentPlayer = Player

export type Tile = {
	playerId: 1 | 2 | "empty",
	color:string,
	canInsert:boolean,
	sentence:Sentence,
}

export type XAxisNumber = 1 | 2|3 |4 |5 |6 |7 |8 

export type YAxisNumber = 1 | 2|3 |4 |5 |6 |7 |8 

export type XAxisWords = string[]

export type YAxisWords = string[]

export type GameBoard = [
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile]
]

export type Color = "red" | "green" | "yellow"| "purple"|"black" | "orange" | "white" | "blue"

export type Sentence = string[]

export type GameStatus = "playing" | "setUp" | "gameover"

const playerOne:Player = {
    playerId:1,
    color:"blue"
} 

const playerTwo:Player = {
    playerId:2,
    color:"red"
} 

const players = {
    1:playerOne,
    2:playerTwo
}

let currentPlayer:CurrentPlayer = playerOne

const setCurrentPlayer = (number:1|2)=> currentPlayer = players[number]
const getCurrentPlayer = ()=> currentPlayer


export {getCurrentPlayer, setCurrentPlayer}