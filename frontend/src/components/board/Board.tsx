import React, { useEffect, useRef, useState } from "react";
import "./Board.css"
import Canvas from "../canvas/Canvas";

const MODEL_DIM = 28

function Board() {
    const [color, setColor] = useState("#000000")
    const [lineWidth, setLineWidth] = useState(24)
    
    const canvasRef = useRef(null);
    const [results, setResults] = useState("Please, draw a number from 0 to 9.");
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setResults("Please, draw a number from 0 to 9.");
        }
    };

    const saveDrawing = async () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');

            link.download = 'drawing.png';
            link.href = canvas.toDataURL('image/png');
            
            const imageData = {
                href: link.href
            }
            
            try {
                const response = await fetch("http://127.0.0.1:8000/save_image", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(imageData)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Success:', result);
                setResults(`The number is ${result.prediction}`);
            }
            
            catch (error) {
                console.log(error);
                setResults("Not ok");
            }

            // const formData = new FormData();
            // formData.append('file', link);

            // try {
            //     const response = await fetch('http://localhost:8000/save_image', {
            //         method: 'POST',
            //         body: formData,
            //     });
            //     console.log("Image sent to the server successfully!", response)
            // } catch (error) {
            //     console.log("The image was not sent to the server correctly!")
            // }
        }
    };
    
    return (
        <section className="board-container">
            <div className="palette-container">
                <h1 className="palette">Neural Sketcher!</h1>
                {/* <div className="toolbar">
                    <label htmlFor="color">Color</label>
                    <input id="color" name="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    <label htmlFor="lineWidth">Line Width</label>
                    <input id="lineWidth" name="lineWidth" type="range" min={-5} max={50} value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
                </div> */}
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
            <div>{results}</div>
        </section>
    )
}

export default Board;
