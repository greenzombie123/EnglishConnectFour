import { Color, Player, PlayerId } from "./model";

export type ColorPickerView = {
  hideColorPicker: () => void;
  getColorDots: () => [HTMLDivElement[], HTMLDivElement[]];
  changeColor: (playerId: PlayerId, color: Color) => void;
  getButton: () => HTMLButtonElement;
  disallowSameColors: (playerOne: Player, playerTwo: Player) => void;
};

const colorpickerView = (): ColorPickerView => {
  const colorPickerDiv = document.querySelector(
    "dialog.colorPicker",
  ) as HTMLDialogElement;

  const [playerOneColor, playerTwoColor] = Array.from(
    colorPickerDiv.querySelectorAll(".playerColorPicker .playerColor"),
  ) as [HTMLDivElement, HTMLDivElement];

  const playerOneColorDots = Array.from(
    colorPickerDiv.querySelectorAll(".playerOne .colorChoices *"),
  ) as HTMLDivElement[];

  const playerTwoColorDots = Array.from(
    colorPickerDiv.querySelectorAll(".playerTwo .colorChoices *"),
  ) as HTMLDivElement[];

  const button = colorPickerDiv.querySelector("button") as HTMLButtonElement;

  const changeColor = (playerId: PlayerId, color: Color) => {
    const playerColor = playerId === 1 ? playerOneColor : playerTwoColor;
    playerColor.style.backgroundColor = color;
  };

  const hideColorPicker = () => colorPickerDiv.close();
  const revealColorPicker = () => colorPickerDiv.showModal();
  const getColorDots = (): [HTMLDivElement[], HTMLDivElement[]] => [
    playerOneColorDots,
    playerTwoColorDots,
  ];
  const getButton = () => button;
  const disallowSameColors = (playerOne: Player, playerTwo: Player) => {
    playerOneColorDots.forEach((colorDot) => {
      if (colorDot.classList[0] === playerTwo.color)
        colorDot.classList.add("notAllowed");
      else colorDot.classList.remove("notAllowed");
    });

    playerTwoColorDots.forEach((colorDot) => {
      if (colorDot.classList[0] === playerOne.color)
        colorDot.classList.add("notAllowed");
      else colorDot.classList.remove("notAllowed");
    });
  };

  revealColorPicker();

  return {
    hideColorPicker,
    getColorDots,
    changeColor,
    getButton,
    disallowSameColors,
  };
};

export default colorpickerView();
