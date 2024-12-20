import {
  FourCoodinates,
  XAxisNumber,
  XAxisWords,
  YAxisNumber,
  YAxisWords,
} from "./model";
import tileView, { TileView } from "./tileView";

export type GameBoardView = {
  renderAxes: (xwords: XAxisWords, ywords: YAxisWords) => void;
  getTileViews: () => TileView[];
  highlightFourInARow : (coordinates: FourCoodinates) => void;
  resetTiles:()=>void
};

const gameBoardView = (): GameBoardView => {
  let tileViews: TileView[];

  // const gameBoard: HTMLDivElement = document.querySelector(
  //   ".gameBoard",
  // ) as HTMLDivElement;

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

  const createTileViews = (tileDivs: HTMLDivElement[]) => {
    const tileViews: TileView[] = [];
    let index = 0;

    for (let y: YAxisNumber = 5; y >= 0; y--) {
      for (let x: XAxisNumber = 0; x <= 9; x++) {
        x = x as XAxisNumber;
        y = y as YAxisNumber;
        const tv = tileDivs[index];
        if (tv) {
          tileViews.push(tileView(tv, [y, x]));
        }
        index++;
      }
    }

    return tileViews;
  };

  const setTileViews = (tileViewList: TileView[]) => {
    tileViews = tileViewList;
  };

  const getTileViews = () => tileViews;

  const renderAxes = (xwords: XAxisWords, ywords: YAxisWords) => {
    renderXaxis(xwords);
    renderYaxis(ywords);
  };

  const highlightFourInARow = (coordinates: FourCoodinates) => {
    const tileViews = getTileViews();

    tileViews.forEach((tileView) => {
      const tvCoordinates = tileView.getCoordinates();

      coordinates.forEach((coordinate) => {
        if (
          coordinate[0] === tvCoordinates[0] &&
          coordinate[1] === tvCoordinates[1]
        )
          tileView.flashToken();
      });
    });
  };

  const resetTiles = ()=>{
    const tileViews = getTileViews()
    tileViews.forEach(tileView=>tileView.deleteToken())
  }

  setTileViews(createTileViews(getTileDivs()));

  return { renderAxes, getTileViews, highlightFourInARow, resetTiles };
};

export default gameBoardView();
