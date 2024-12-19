import { eventEmitter } from "../../../customNodePackages/eventListenerHelper";
import colorPickerView from "./colorPickerView";
import colorpickerView, { ColorPickerView } from "./colorPickerView";
import gameBoardView, { GameBoardView } from "./gameBoardView";
import quizView, { QuizView } from "./quizView";
import winnerPopupView, { WinnerPopUpView } from "./winnerPopupView";
import model, {
  Color,
  FourCoodinates,
  GameBoard,
  Model,
  Player,
  PlayerId,
  Winner,
  XAxisNumber,
  YAxisNumber,
} from "./model";
import { TileView } from "./tileView";
import quizModel, { CorrectSentence, ScrambledSentence, UserAnswer } from "./quizModel";

type ControllerProps = {
  gameBoardView: GameBoardView;
  model: Model;
  colorPickerView:ColorPickerView,
  quizView:QuizView,
  winnerPopView:WinnerPopUpView
};

// export type  

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

const handleColorDotClick =(colorDotDiv:HTMLDivElement, playerId:PlayerId)=> ()=>{
    const color:Color = colorDotDiv.classList[0] as Color
    model.setPlayerColor(playerId, color)
}

const handleStartButtonClick = ()=>{
    colorpickerView.hideColorPicker()
    model.startGame();
}

const handleChosePlayerColor = ({playerId, color}:{playerId:PlayerId, color:Color})=>{
    colorPickerView.changeColor(playerId, color)
}

const handleDisallowSameColor = ({1:a, 2:b}:{1:Player,2:Player})=>{
  colorPickerView.disallowSameColors(a, b)
}

const handleInvalidMove = ([y, x]:[y:YAxisNumber, x:XAxisNumber])=>{
    const tileViews = gameBoardView.getTileViews();
  const pickedTile = tileViews.find((tileView) => {
    const [tvY, tvX] = tileView.getCoordinates();
    if (tvX === x && tvY === y) return tileView;
  });
  if (pickedTile) pickedTile.showInvalidMove();
}

const handleQuizStarted = ({quiz,userAnswer, translation}:{quiz:ScrambledSentence, userAnswer:UserAnswer, translation:string})=>{
    const wordLists = quizView.renderWords(quiz, userAnswer)
    quizView.renderTranslation(translation)
    attachWorkClickHandlers(wordLists)
    quizView.revealQuiz()
}

const handleQuizWordClick = (index:number)=>()=>{
    quizModel.pickWord(index)
}

const handleUserAnswerWordClick = (index:number)=>()=>{
    quizModel.unpickWord(index)
}

const handleRerenderWords = ({quiz,userAnswer}:{quiz:ScrambledSentence, userAnswer:UserAnswer}) =>{
    const wordLists = quizView.renderWords(quiz, userAnswer)
    attachWorkClickHandlers(wordLists)
}

const handleCloseQuiz = ()=>{
    quizView.hideQuiz()
}


const handleResetButtonClick = ()=>{
    const [quiz, userAnswer] = quizModel.resetQuiz()
    const wordLists = quizView.renderWords(quiz, userAnswer)
    attachWorkClickHandlers(wordLists)
}

const attachWorkClickHandlers = ({ssWords,uaWords}:{ssWords:HTMLDivElement[], uaWords:HTMLDivElement[]})=>{
    ssWords.forEach((ssWord, index)=>{
        ssWord.addEventListener('click', handleQuizWordClick(index))
    })

    uaWords.forEach((uaWord, index)=>{
        uaWord.addEventListener("click", handleUserAnswerWordClick(index))
    })
}

const handleShowWinnerPopup = (winner:Winner)=>{

    setTimeout(()=>{
        winnerPopupView.setPlayerColor(winner.player.color)
        winnerPopupView.setWinnerText(winner.player.playerId)
        winnerPopupView.revealWinnerPopup()
    }, 1000)  
}

const handleCloseWinnerPopup = ()=>{
    winnerPopupView.hideWinnerPopup()
    // 
    model.startGame()
}

const handleFlashTokens = (coordinates:FourCoodinates)=>{
    gameBoardView.highlightFourInARow(coordinates)
}

const controller = (props: ControllerProps) => {
  const { gameBoardView, model } = props;

  const init = () => {
    const words = model.getAxisWords();
    gameBoardView.renderAxes(words[0], words[1]);

    const tileViews: TileView[] = gameBoardView.getTileViews();

    // handle tile clicking
    tileViews.map((tileView) => {
      const tileDiv: HTMLDivElement = tileView.getTileDiv();
      tileDiv.addEventListener("click", handleTileClick(tileView));
    });

    eventEmitter.subscribe("insertToken", handleInsertToken);

    // handle color picker clicking 
    const [playerOneColorDots, playerTwoColorDots] = colorPickerView.getColorDots()

    playerOneColorDots.forEach(colorDot=>{
        colorDot.addEventListener("click", handleColorDotClick(colorDot, 1))
    })

    playerTwoColorDots.forEach(colorDot=>{
        colorDot.addEventListener("click", handleColorDotClick(colorDot, 2))
    })

    const colorPickerButton = colorPickerView.getButton()
    colorPickerButton.addEventListener("click", handleStartButtonClick)

    eventEmitter.subscribe("choseColor", handleChosePlayerColor)

    eventEmitter.subscribe("disallowSameColor", handleDisallowSameColor)

    handleDisallowSameColor(model.getPlayers())

    // Handle wrong tile clicking
    eventEmitter.subscribe("invalidMove", handleInvalidMove)


    // Handle the event when a quiz has started
    eventEmitter.subscribe("quizStarted", handleQuizStarted)
    
    // Handle rerendering words
    eventEmitter.subscribe("rerenderWords", handleRerenderWords)

    // Handle closing the quiz dialog
    eventEmitter.subscribe("closeQuiz", handleCloseQuiz)

    // Handle resetting the quiz when reset button is pressed
    const resetButton = quizView.getResetButton()
    resetButton.addEventListener("click", handleResetButtonClick)

    // Handle revealing winner popup when a 4 in a row was made
    eventEmitter.subscribe("gameSet", handleShowWinnerPopup)

    // Handle flashing winning tokens 
    eventEmitter.subscribe("flashTokens", handleFlashTokens)
  };

  return { init };
};

const props: ControllerProps = {
  gameBoardView: gameBoardView,
  model: model,
  colorPickerView:colorPickerView,
  quizView:quizView,
  winnerPopView:winnerPopupView
};

export default controller(props);
