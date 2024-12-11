import { XAxisWords, YAxisWords } from "./model";

export type GameBoardView = {
  renderAxes: (xwords: XAxisWords, ywords: YAxisWords) => void;
};

const gameBoardView = (): GameBoardView => {
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

  const renderAxes = (xwords: XAxisWords, ywords: YAxisWords) => {
    renderXaxis(xwords);
    renderYaxis(ywords);
  };

  return { renderAxes };
};

export default gameBoardView();
