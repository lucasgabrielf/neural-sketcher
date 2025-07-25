import React, { useEffect, useRef, useState } from "react";
import "./Board.css"
import Canvas from "../canvas/Canvas";

function Board() {
    const [color, setColor] = useState("#000000")
    const [lineWidth, setLineWidth] = useState(5)
    
    const canvasRef = useRef(null);
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    
    const saveDrawing = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'drawing.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };
    
    return (
        <section className="board-container">
            <div className="palette-container">
                <h1 className="palette">NN Guesser</h1>
                <div className="toolbar">
                    <label htmlFor="color">Color</label>
                    <input id="color" name="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    <label htmlFor="lineWidth">Line Width</label>
                    <input id="lineWidth" name="lineWidth" type="range" min={-5} max={50} value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
                </div>
            </div>
            <div className="drawing-board">
                <Canvas 
                canvasRef={canvasRef}
                color={color}
                lineWidth={lineWidth}
                />
            </div>
            <div className="buttons-container">
                <button id="clear" onClick={clearCanvas}>Clear</button>
                <button id="save" onClick={saveDrawing}>Save</button>
            </div>
        </section>
    )
}

export default Board;
