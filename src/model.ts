type Player = {
	player:1 | 2,
	color:string
}

type CurrentPlayer = Player

type Tile = {
	player: 1 | 2 | "empty",
	color:string,
	canInsert:boolean,
	sentence:Sentence,
}

type XAxisNumber = 1 | 2|3 |4 |5 |6 |7 |8 

type YAxisNumber = 1 | 2|3 |4 |5 |6 |7 |8 

type XAxisWords = string[]

type YAxisWords = string[]

type GameBoard = [
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile],
    [Tile,Tile,Tile,Tile,Tile,Tile,Tile,Tile, Tile, Tile]
]

type Color = "red" | "green" | "yellow"| "purple"|"black" | "orange" | "white" | "blue"

type Sentence = string[]

type GameStatus = "playing" | "setUp" | "gameover"