
// type ColorPickerView = {

// }

const colorpickerView = ():ColorPickerView=>{

    const colorPickerDiv = document.querySelector(".colorPicker") as HTMLDialogElement

    colorPickerDiv.showModal()

    return {}
}

export default colorpickerView

