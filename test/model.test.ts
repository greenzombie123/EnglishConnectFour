import { describe, expect, test } from "@jest/globals";
import {setCurrentPlayer, getCurrentPlayer, Player} from "../src/model"

describe("getCurrentPlayer", ()=>{

    test("Get current player object", ()=>{
        const expected:Player = {playerId:1, color:"blue"}
        const result:Player = getCurrentPlayer()

        expect(expected).toEqual(result)
    })
})

describe("setCurrentPlayer", ()=>{
    
    test("Set currentPlayer to player 2", ()=>{
        const expected:Player = {playerId:2, color:"red"}
        const result:Player = setCurrentPlayer(2)

        expect(result).toEqual(expected)
    })

    test("Set currentPlayer to player 1", ()=>{
        const expected:Player = {playerId:1, color:"blue"}
        let result:Player = setCurrentPlayer(2)
        result= setCurrentPlayer(1)

        expect(result).toEqual(expected)
    })
})