import React, { useEffect, useRef, useState } from "react";
import "./Board.css"
import Canvas from "../canvas/Canvas";
import ProbCircle from "../probCircle/ProbCircle";
import { useNavigate } from "react-router-dom";

const MODEL_DIM = 28

function Board() {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const [color, setColor] = useState("#000000")
    const [lineWidth, setLineWidth] = useState(24)
    
    const canvasRef = useRef(null);
    const [results, setResults] = useState(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
    const [predNumber, setPredNumber] = useState("Model predicted the number is...");
    const [guessNumber, setGuessNumber] = useState(getRandomInt(10));
    const [tryAgain, setTryAgain] = useState(false);
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setResults(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"])
            setPredNumber("Model predicted the number is...")
        }
        if(tryAgain===true){
            setTryAgain(false);
            setGuessNumber(getRandomInt(10));
        }
    };


    const saveDrawing = async () => {
        setTryAgain(true);
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
                setResults(result.predictions);
                setPredNumber(`${result.predNumber}!  The correct number was ${guessNumber}.`)
                console.log('Success:', results);

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
    
    const navigation = useNavigate();

    return (
        <section className="board-container">
            <button className="go-home" onClick={()=>{navigation("/")}}>HOME</button>
            <div className="palette-container">
                <h1 className="palette">THE NUMBER IS: <span className="special-title">{guessNumber}</span></h1>
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
                <button id="clear" onClick={clearCanvas}>{tryAgain===false ? "CLEAR":"TRY AGAIN!"}</button>
                <button id="save" onClick={saveDrawing} disabled={tryAgain}>IT'S DONE!</button>
            </div>
            <p className="probs-text">{predNumber}</p>
            <div className="probs-container">
                <ProbCircle number={0} level={ results[0] } />
                <ProbCircle number={1} level={ results[1] } />
                <ProbCircle number={2} level={ results[2] } />
                <ProbCircle number={3} level={ results[3] } />
                <ProbCircle number={4} level={ results[4] } />
                <ProbCircle number={5} level={ results[5] } />
                <ProbCircle number={6} level={ results[6] } />
                <ProbCircle number={7} level={ results[7] } />
                <ProbCircle number={8} level={ results[8] } />
                <ProbCircle number={9} level={ results[9] } />
            </div>
        </section>
    )
}

export default Board;
