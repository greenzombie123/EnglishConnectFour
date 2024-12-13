import { Color, XAxisNumber, YAxisNumber } from "./model";

export type TileView = {
  renderToken: (color: Color) => void;
  showMistake: () => void;
  getCoordinates: () => [YAxisNumber, XAxisNumber];
  getTileDiv:()=>HTMLDivElement
};

const tileView = (
  tileDiv: HTMLDivElement,
  coordinates: [YAxisNumber, XAxisNumber],
): TileView => {
  const renderToken = (color: Color) => {
    const token: HTMLDivElement = document.createElement("div");
    tileDiv.appendChild(token);
    token.classList.add(color, "token");
  };

  const showMistake = () => {};

  const getCoordinates = () => coordinates;

  const getTileDiv = ()=> tileDiv

  return { renderToken, showMistake, getCoordinates, getTileDiv };
};

export default tileView;
