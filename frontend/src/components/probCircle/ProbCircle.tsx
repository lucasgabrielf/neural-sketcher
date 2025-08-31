import "./ProbCircle.css";

function ProbCircle({ number, level }) {
  // Ensure the level is within the valid range (0-100)

  // This style object will set a CSS custom property '--level'
  // that our CSS file can use to control the height of the fill.
  const circleStyle = {
    '--level': `${level}%`
  };

  return (
    <div className="circle-container">
        <div className="circle" style={circleStyle}>
            <p className="inside-text">{number}</p>
        </div>
        <p className="outside-text">{level}%</p>
    </div>
  );
}

export default ProbCircle;