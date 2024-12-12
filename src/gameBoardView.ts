import {
  XAxisNumber,
  XAxisWords,
  YAxisNumber,
  YAxisWords,
} from "./model";
import tileView, { TileView } from "./tileView";

export type GameBoardView = {
  renderAxes: (xwords: XAxisWords, ywords: YAxisWords) => void;
  getTileViews:()=>TileView[]
};

const gameBoardView = (): GameBoardView => {
  let tileViews: TileView[];

  const gameBoard: HTMLDivElement = document.querySelector(
    ".gameBoard",
  ) as HTMLDivElement;

  const xLabels: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".x-label"),
  );
  const yLabels: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".y-label"),
  );

  const renderYaxis = (ywords: YAxisWords) => {
    ywords.forEach((word, index) => {
      yLabels[5 - index]!.textContent = word;
    });
  };

  const renderXaxis = (xwords: XAxisWords) => {
    xwords.forEach((word, index) => {
      xLabels[index]!.textContent = word;
    });
  };

  const getTileDivs = () =>
    Array.from(document.querySelectorAll(".tile")) as HTMLDivElement[];

  const createTileViews = (
    tileDivs: HTMLDivElement[],
  ) => {
    const tileViews: TileView[] = [];
    let index = 0

    for (let y: YAxisNumber = 5; y >= 0; y--) {
      for (let x: XAxisNumber = 0; x <= 9; x++) {
        x = x as XAxisNumber;
        y = y as YAxisNumber;
        const tv = tileDivs[index]
        if (tv) {
          tileViews.push( tileView(tv, [y, x]));
        }
        index++
      }
    }

    return tileViews
  };

  const setTileViews = (tileViewList:TileView[]) => {
    tileViews = tileViewList
  };

  const getTileViews = ()=> tileViews

  const renderAxes = (xwords: XAxisWords, ywords: YAxisWords) => {
    renderXaxis(xwords);
    renderYaxis(ywords);
  };

  setTileViews(createTileViews(getTileDivs()))

  return { renderAxes, getTileViews };
};

export default gameBoardView();
