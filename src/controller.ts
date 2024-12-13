import { eventEmitter } from "../../../customNodePackages/eventListenerHelper";
import colorpickerView from "./colorPickerView";
import gameBoardView, { GameBoardView } from "./gameBoardView";
import model, {
  Color,
  GameBoard,
  Model,
  Player,
  XAxisNumber,
  YAxisNumber,
} from "./model";
import { TileView } from "./tileView";

type ControllerProps = {
  gameBoardView: GameBoardView;
  model: Model;
};

const handleTileClick = (tileView: TileView) => () => {
  const [y, x]: [YAxisNumber, XAxisNumber] = tileView.getCoordinates();
  const gameBoard: GameBoard = model.getGameBoard();
  model.pickTile(y, x, gameBoard);
};

const handleInsertToken = ({
  color,
  x,
  y,
}: {
  color: Color;
  x: XAxisNumber;
  y: YAxisNumber;
}) => {
  const tileViews = gameBoardView.getTileViews();
  const pickedTile = tileViews.find((tileView) => {
    const [tvY, tvX] = tileView.getCoordinates();
    if (tvX === x && tvY === y) return tileView;
  });
  if (pickedTile) pickedTile.renderToken(color);
};

const controller = (props: ControllerProps) => {
  const { gameBoardView, model } = props;

  const init = () => {
    const words = model.getAxisWords();
    gameBoardView.renderAxes(words[0], words[1]);

    const tileViews: TileView[] = gameBoardView.getTileViews();

    tileViews.map((tileView) => {
      const tileDiv: HTMLDivElement = tileView.getTileDiv();
      tileDiv.addEventListener("click", handleTileClick(tileView));
    });

    eventEmitter.subscribe("insertToken", handleInsertToken);

    colorpickerView()

    model.startGame();
  };

  return { init };
};

const props: ControllerProps = {
  gameBoardView: gameBoardView,
  model: model,
};

export default controller(props);
