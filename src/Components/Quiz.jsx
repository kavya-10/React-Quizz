// import React, { useState,useEffect} from 'react'
// import { QuizData } from '../Data/QuizData'
// import QuizResult from './QuizResult';
// function Quiz() {
//     const [currentQuestion,setCurrentQuestion]=useState(0);
//     const [score,setScore] = useState(0);
//     const [clickedOption,setClickedOption]=useState(0);
//     const [showResult,setShowResult]=useState(false);
//     const [timeLeft, setTimeLeft] = useState(30); // for example, 30 seconds per question
//     const [timer, setTimer] = useState(null);



//     useEffect(() => {
//         // Clear existing timer if any
//         if (timer) {
//           clearInterval(timer);
//         }
    
//         // Start a new timer
//         setTimer(
//           setInterval(() => {
//             setTimeLeft((prevTime) => {
//               if (prevTime <= 1) {
//                 clearInterval(timer);
//                 changeQuestion();
//                 return 30; // reset to initial time for the next question
//               }
//               return prevTime - 1;
//             });
//           }, 1000)
//         );
    
//         // Clear the timer on component unmount
//         return () => clearInterval(timer);
//       }, [currentQuestion]);
    
//     const changeQuestion = ()=>{
//         updateScore();
//         if(currentQuestion< QuizData.length-1){
//             setCurrentQuestion(currentQuestion+1);
//             setClickedOption(0);
//         }else{
//             setShowResult(true)
//         }
//     }
//     const updateScore=()=>{
//         if(clickedOption===QuizData[currentQuestion].answer){
//             setScore(score+1);
//         }
//     }
//     const resetAll=()=>{
//         setShowResult(false);
//         setCurrentQuestion(0);
//         setClickedOption(0);
//         setScore(0);
//     }
//   return (
//     <div>
//         <p className="heading-txt">Quiz APP</p>
//         <div className="container">
//             {showResult ? (
//                 <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>
//             ):(
//             <>
//             <div className="question">
//                 <span id="question-number">{currentQuestion+1}. </span>
//                 <span id="question-txt">{QuizData[currentQuestion].question}</span>
//             </div>
//             <div className="option-container">
//                 {QuizData[currentQuestion].options.map((option,i)=>{
//                     return(
//                         <button 
//                         // className="option-btn"
//                         className={`option-btn ${
//                             clickedOption == i+1?"checked":null
//                         }`}
//                         key={i}
//                         onClick={()=>setClickedOption(i+1)}
//                         >
//                         {option}
//                         </button>
//                     )
//                 })}                
//             </div>
//             <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
//             </>)}
//         </div>
//     </div>
//   )
// }

// export default Quiz






import React, { useState, useEffect } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  useEffect(() => {
    // Set up the timer
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          changeQuestion();
          return 30;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    // Clean up the timer on component unmount or when currentQuestion changes
    return () => clearInterval(timer);
  }, [currentQuestion]); // Depend on currentQuestion to reset timer on question change

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
      setTimeLeft(30); // Reset time for the next question
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setTimeLeft(30);
  };

  return (
    <div>
      <p className="heading-txt">Quiz APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>
            {/* <div className="timer">
              Time Left: {timeLeft}s
            </div> */}
            <div className="option-container">
              {QuizData[currentQuestion].options.map((option, i) => {
                return (
                  <button
                    className={`option-btn ${clickedOption === i + 1 ? "checked" : null}`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="timer">
              Time Left: {timeLeft}s
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
