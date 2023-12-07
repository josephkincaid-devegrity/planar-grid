import "./App.css";
import monkey from "./monkey.svg";
import { useState } from "react";

function App() {
  const [numOfPoints, setNumOfPoints] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  function handleClick() {
    let x, y, xSum, ySum, totalPoints;
    x = y = xSum = ySum = totalPoints = 0;
    let hasMoves = true;

    setIsWorking(true);

    while (hasMoves) {
      if (xSum + ySum <= 19) {
        totalPoints++;
        x++;
        xSum = getSumOfDigits(x);
        ySum = getSumOfDigits(y);
        if (xSum + ySum > 19) {
          // Reset X to zero and increment Y one place
          x = 0;
          y++;
          xSum = getSumOfDigits(x);
          ySum = getSumOfDigits(y);
        }
      } else {
        hasMoves = false;
      }
    }

    // Using the total points counted in one quadrant, multiplied by 4 to cover all quadrants
    setNumOfPoints(totalPoints * 4);
    setIsWorking(false);
  }

  function getSumOfDigits(num) {
    let sum = 0;
    while (num) {
      // Modulo 10 for the last digit, then drop digit and place
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={monkey} className="Monkey-image" alt="Monkey" />
        <p className="Small-text">
          There is a monkey which can walk around on a planar grid. The monkey can move one space at a time left, right,
          up or down. That is, from (x, y) the monkey can go to (x+1, y), (x-1, y), (x, y+1), and (x, y-1).
        </p>
        <p className="Small-text">
          Points where the sum of the digits of the absolute value of the x coordinate plus the sum of the digits of the
          absolute value of the y coordinate are lesser than or equal to 19 are accessible to the monkey. For example,
          the point (59, 79) is inaccessible because 5 + 9 + 7 + 9 = 30, which is greater than 19. Another example: the
          point (-5, -7) is accessible because abs(-5) + abs(-7) = 5 + 7 = 12, which is less than 19.
        </p>
        <p className="Small-text">
          How many points can the monkey access if it starts at (0, 0), including (0, 0) itself?
        </p>
        <button className="btn btn-light" onClick={handleClick} disabled={isWorking}>
          Calculate
          {isWorking && <span className="spinner-border spinner-border-sm mx-1"></span>}
        </button>
        {numOfPoints > 0 && <>Points: {numOfPoints}</>}
      </header>
    </div>
  );
}

export default App;
