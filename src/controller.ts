import gameBoardView, { GameBoardView } from "./gameBoardView"
import model, { Model } from "./model"

type ControllerProps = {
    gameBoardView:GameBoardView,
    model:Model
}


const controller = (props:ControllerProps)=>{

    const {gameBoardView, model} = props

    const init = ()=>{
        const words = model.getAxisWords()
        gameBoardView.renderAxes(words[0], words[1])
    }

    return {init}
}

const props: ControllerProps = {
    gameBoardView:gameBoardView,
    model:model
}

export default controller(props)