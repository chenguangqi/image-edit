import React from 'react';

function ToolBar(props) {
    return (
        <div className="toolbar">
            <div>
                <label htmlFor="imagefile">载入图片</label>
                <input type="file" name="imagefile" onChange={props.loadFile} accept="image/png,image/jpeg" />
            </div>
            <button onClick={props.saveImage}>保存图片</button>
            <button onClick={props.undoImage}>撤销</button>
        </div>
    )
}

export default ToolBar;