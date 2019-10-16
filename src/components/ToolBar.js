import React from 'react';


                // <label htmlFor="fontsize">字体大小: </label>
                // <input type="number" name="fontsize" onChange={props.fontSize} value="40" />

function ToolBar(props) {
    return (
        <div className="toolbar">
            <div>
                <label htmlFor="imagefile">载入图片: </label>
                <input type="file" name="imagefile" onChange={props.loadFile} accept="image/png,image/jpeg" />
            </div>
            <div>
                <label htmlFor="font-size">字体大小: </label>
                <input type="number" style={{width: '48px'}} name="font-size" min="1" max="1024" value={props.fontSize} onChange={props.changeFontSize} />
            </div>
            <button onClick={props.undoImage}>撤销</button>
        </div>
    )
}

export default ToolBar;