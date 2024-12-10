import { describe, expect, test } from "@jest/globals";
import {
  setCurrentPlayer,
  getCurrentPlayer,
  Player,
  setPlayerColor,
  getPlayers,
  Tile,
  createTile,
  GameBoard,
  createGameGrid,
  XAxisWords,
  YAxisWords,
  isHorizontalLineWinner,
  XAxisNumber,
  YAxisNumber,
  CounterNumber,
  isHLineWithinGameBoard,
  findTile,
  isVerticalLineWinner,
  isDiagonalLineWinner,
  checkHorizontalLine,
  checkVerticalLine,
  checkDiagonalLine,
  insertToken,
  setGameBoard,
  getGameBoard,
  PickedTile,
  makeLowestRowInsertable,
  EmptyTile,
  canBeInsertable,
  isAboveTileInsertable,
} from "../src/model";

describe("getCurrentPlayer", () => {
  test("Get current player object", () => {
    const expected: Player = { playerId: 1, color: "blue" };
    const result: Player = getCurrentPlayer();

    expect(expected).toEqual(result);
  });
});

describe("setCurrentPlayer", () => {
  test("Set currentPlayer to player 2", () => {
    const expected: Player = { playerId: 2, color: "red" };
    setCurrentPlayer(2);
    const result: Player = getCurrentPlayer();

    expect(result).toEqual(expected);
  });

  test("Set currentPlayer to player 1", () => {
    const expected: Player = { playerId: 1, color: "blue" };
    setCurrentPlayer(2);
    setCurrentPlayer(1);
    const result: Player = getCurrentPlayer();

    expect(result).toEqual(expected);
  });
});

describe("setPlayerColor", () => {
  test("Set playerOne color to yellow", () => {
    const expected: Player = { playerId: 1, color: "yellow" };
    setPlayerColor(1, "yellow");
    const result: Player = getPlayers()[1];

    expect(result).toEqual(expected);
  });
});

describe("createTile", () => {
  test("Create a tile object", () => {
    const expected: Tile = {
      playerId: "empty",
      color: "nocolor",
      sentence: ["I", "study"],
      canInsert: false,
    };

    const result: Tile = createTile("I", "study");

    expect(result).toEqual(expected);
  });
});

describe("createGameBoard", () => {
  test("The tile on the 2nd row and last column has a ['He', 'buy'] value in its sentence prop", () => {
    const expected: Tile = {
      playerId: "empty",
      color: "nocolor",
      sentence: ["He", "buy"],
      canInsert: false,
    };

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

    const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);

    const result = gameBoard[1][9];

    expect(result).toEqual(expected);
  });
});

describe("findTile", () => {
  test("Return a tile from coordinates [2,2]", () => {
    const expected: Tile = {
      playerId: "empty",
      color: "nocolor",
      sentence: ["She", "sleep"],
      canInsert: false,
    };

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

    const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);

    const result = findTile(2,2, gameBoard)

    expect(result).toEqual(expected);
  });
});

describe("isHorizontalLineWinner", () => {
  test("Return false if not all the four tiles in a horizontal line have player one on them", () => {

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

    const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]

    const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);

    const result: boolean = isHorizontalLineWinner(targetY, targetX, gameBoard, 0, 1);

    expect(result).toBe(false);
  });

  test("Return true if  all the four tiles in a horizontal line have player one on them", () => {
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

    const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [5,0]

    const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
    gameBoard[0][2].playerId = 1
    gameBoard[0][3].playerId = 1
    gameBoard[0][4].playerId = 1
    gameBoard[0][5].playerId = 1

    const result: boolean = isHorizontalLineWinner(targetY, targetX, gameBoard, -3, 1);

    expect(result).toBe(true);
  });
});

describe("isVerticalLineWinner", () => {
    test("Return false if not all the four tiles in a vertical line have player one on them", () => {
  
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  
      const result: boolean = isVerticalLineWinner(targetY, targetX, gameBoard, 0, 1);
  
      expect(result).toBe(false);
    });
  
    test("Return true if  all the four tiles in a vertical line have player one on them", () => {
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
      gameBoard[0][0].playerId = 1
      gameBoard[1][0].playerId = 1
      gameBoard[2][0].playerId = 1
      gameBoard[3][0].playerId = 1
  
      const result: boolean = isVerticalLineWinner(targetY, targetX, gameBoard, 0, 1);
  
      expect(result).toBe(true);
    });
  });

describe("isHLineWithinGameBoard", () => {
  test("Return true if pass coordinates [1,1] and counter is 0 ", () => {
    const targetX:XAxisNumber = 1;

    const result:boolean = isHLineWithinGameBoard(targetX)

    expect(result).toBe(true);
  });
});

describe("isDiagonalLineWinner", () => {
    test("Return false if not all the four tiles in a Diagonal line have player one on them", () => {
  
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  
      const result: boolean = isDiagonalLineWinner(targetY, targetX, gameBoard, 0, 1);
  
      expect(result).toBe(false);
    });
  
    test("Return true if  all the four tiles in a vertical line have player one on them", () => {
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
      gameBoard[0][0].playerId = 1
      gameBoard[1][1].playerId = 1
      gameBoard[2][2].playerId = 1
      gameBoard[3][3].playerId = 1
  
      const result: boolean = isDiagonalLineWinner(targetY, targetX, gameBoard, 0, 1);
  
      expect(result).toBe(true);
    });
  });

  describe("checkHorizontalLine", () => {
    test("Return false there is no four tokens in a horizontal row", () => {
  
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  
      const result: boolean = checkHorizontalLine(targetY, targetX, gameBoard, 1)
  
      expect(result).toBe(false);
    });
  
    test("Return true if there are four tokens in a horizontal row", () => {
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
      gameBoard[0][0].playerId = 1
      gameBoard[0][1].playerId = 1
      gameBoard[0][2].playerId = 1
      gameBoard[0][3].playerId = 1
  
      const result: boolean = checkHorizontalLine(targetY, targetX, gameBoard, 1);
  
      expect(result).toBe(true);
    });
  });

  describe("checkVerticalLine", () => {
    test("Return false there is no four tokens in a vertical row", () => {
  
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  
      const result: boolean = checkVerticalLine(targetY, targetX, gameBoard, 1)
  
      expect(result).toBe(false);
    });
  
    test("Return true if there are four tokens in a vertical column", () => {
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
      gameBoard[0][0].playerId = 1
      gameBoard[1][0].playerId = 1
      gameBoard[2][0].playerId = 1
      gameBoard[3][0].playerId = 1
  
      const result: boolean = checkVerticalLine(targetY, targetX, gameBoard, 1);
  
      expect(result).toBe(true);
    });
  });

  describe("checkDiagonalLine", () => {
    test("Return false there is no four tokens in a diagonal row", () => {
  
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  
      const result: boolean = checkDiagonalLine(targetY, targetX, gameBoard, 1)
  
      expect(result).toBe(false);
    });
  
    test("Return true if there are four tokens in a diagonal column", () => {
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
      gameBoard[0][0].playerId = 1
      gameBoard[1][1].playerId = 1
      gameBoard[2][2].playerId = 1
      gameBoard[3][3].playerId = 1
  
      const result: boolean = checkDiagonalLine(targetY, targetX, gameBoard, 1);
  
      expect(result).toBe(true);
    });

    test("Return true if there are four tokens in an opposite diagonal column", () => {
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [3,3]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
      gameBoard[3][3].playerId = 1
      gameBoard[2][2].playerId = 1
      gameBoard[1][1].playerId = 1
      gameBoard[0][0].playerId = 1
  
      const result: boolean = checkDiagonalLine(targetY, targetX, gameBoard, 1);
  
      expect(result).toBe(true);
    });
  });

  describe("insertToken", () => {
    test("Change Tile in 0,0 to player 1 and to player one's color", () => {

      const expectedTile:PickedTile = {playerId:1, color:"blue", canInsert:false} 
  
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
  
      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,0]
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);
  
      setGameBoard(gameBoard)

      const playeOne:Player = {playerId:1, color:"blue"} 

      insertToken(targetY, targetX, gameBoard, playeOne)

     const resultTile = getGameBoard()[0][0]
  
      expect(resultTile).toEqual(expectedTile);
    });
  });


  
  describe("makeLowestRowInsertable", () => {
    test("Change canInsert prop of all tiles in lowest row to true", () => {

      const expectedTiles : EmptyTile[] = [
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
        {playerId:"empty", color:"nocolor", canInsert:true, sentence:["a", "a"]},
      ] 
  
      const xAxisWords: XAxisWords = [
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
      ];
      const yAxisWords: YAxisWords = ["a", "a", "a", "a", "a", "a"];
  
      const gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);

      makeLowestRowInsertable(gameBoard)

      const resultTiles:Tile[] = getGameBoard()[0]
  
      expect(resultTiles).toEqual(expectedTiles);
    });
  });

  describe("isAboveTileInsertable", () => {
    test("Change canInsert prop of all tiles in lowest row to true", () => {
  
      const xAxisWords: XAxisWords = [
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
      ];
      const yAxisWords: YAxisWords = ["a", "a", "a", "a", "a", "a"];
  
      let gameBoard: GameBoard = createGameGrid(xAxisWords, yAxisWords);

      makeLowestRowInsertable(gameBoard)

      gameBoard = getGameBoard()

      const [targetX, targetY]:[XAxisNumber, YAxisNumber] = [0,1]

      const result:boolean = isAboveTileInsertable(targetY, targetX, gameBoard)
  
      expect(result).toEqual(true);
    });
  });

  
