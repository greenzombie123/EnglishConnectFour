import { Player } from "./model"

type PlayerFirstView = {
    showDialog:(player:Player)=>void,
    closeDialog:()=>void,
    getButton:()=>HTMLButtonElement
}

const playerFirstView = ():PlayerFirstView=>{
    const dialog = document.querySelector("dialog.playerFirst") as HTMLDialogElement
    const button = dialog.querySelector("button") as HTMLButtonElement
    const playerName = dialog.querySelector(".playerName") as HTMLParagraphElement
    const playerColor = dialog.querySelector(".playerColor") as HTMLDivElement

    const showDialog=(player:Player)=>{
        playerName.textContent = player.playerId === 1 ? "Player One" : "Player Two"
        playerColor.style.backgroundColor = player.color
        dialog.showModal()
    }
    const closeDialog=()=>{
        dialog.close()
    }

    const getButton=()=>button

    return {showDialog, closeDialog, getButton}
}

export default playerFirstView()