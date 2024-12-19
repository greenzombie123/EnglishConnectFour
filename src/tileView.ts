import { Color, XAxisNumber, YAxisNumber } from "./model";

export type TileView = {
  renderToken: (color: Color) => void;
  showInvalidMove: () => void;
  getCoordinates: () => [YAxisNumber, XAxisNumber];
  getTileDiv:()=>HTMLDivElement,
  flashToken:()=>void
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

  const showInvalidMove = () => {
    console.log(123)
    tileDiv.classList.add("invalid")
    setTimeout(()=>{
        tileDiv.classList.remove("invalid")
    }, 100)
  };

  const getCoordinates = () => coordinates;

  const getTileDiv = ()=> tileDiv

  const flashToken =()=>{
    tileDiv.classList.add("winner");
  }

  return { renderToken, showInvalidMove, getCoordinates, getTileDiv, flashToken };
};

export default tileView;
