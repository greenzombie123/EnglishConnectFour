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

      const result = gameBoard[1][9]

      console.log(result)
  
      expect(result).toEqual(expected);
    });
  });
  