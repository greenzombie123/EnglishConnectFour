import { Color, PlayerId } from "./model";

export type WinnerPopUpView = {
  revealWinnerPopup: () => void;
  hideWinnerPopup: () => void;
  getReplayButton: () => HTMLButtonElement;
  setPlayerColor:(color:Color)=>void;
  setWinnerText:(playerId:PlayerId)=>void
};

const winnerPopupView = ():WinnerPopUpView => {
  const dialog = document.querySelector(
    "dialog.winnerPopup",
  ) as HTMLDialogElement;
  const text = dialog.querySelector(".playerName") as HTMLDivElement
  const playerColor = dialog.querySelector(".playerColor") as HTMLDivElement
  const replayButton = dialog.querySelector(".replayButton") as HTMLButtonElement

  const revealWinnerPopup = () => {
    dialog.showModal();
  };

  const hideWinnerPopup = () => {
    dialog.close();
  };
  
  const getReplayButton = () => replayButton;

  const setPlayerColor = (color:Color)=>{
    playerColor.style.backgroundColor = color
  }

  const setWinnerText = (playerId:PlayerId)=>{
    text.textContent = playerId === 1 ? "Player One Wins!" : "Player Two Wins!"
  }

// revealWinnerPopup()

  return {revealWinnerPopup, hideWinnerPopup, getReplayButton, setPlayerColor, setWinnerText};
};

export default winnerPopupView();
