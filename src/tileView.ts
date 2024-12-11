export type TileView = {
    renderToken:()=>void,
    showMistake:()=>void
}

const tileView = ():TileView=>{

    const renderToken = ()=>{}
    const showMistake = ()=>{}

    return {renderToken, showMistake}
}

export default tileView()