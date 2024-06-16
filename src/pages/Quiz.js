import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";

const Quiz = () => {
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [score , setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0
  );
  const [timer, setTimer] = useState(parseInt(localStorage.getItem("timer")));
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const timerRef = useRef(null);

 

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
    startQuiz();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      startQuiz();
    }

    return () => clearInterval(timerRef.current);
  }, [questions]);

  const startQuiz = () => {
    if (!document.fullscreenElement) {
      setFullscreenWarning(true);
      return;
    }
    setFullscreenWarning(false);
    
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          alert("Time's up!");
          navigate('/scorecard')
          return 0;
        }
        localStorage.setItem("timer", prevTimer - 1);
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // clearInterval(timerRef.current);
        setFullscreenWarning(true);
      } else {
        setFullscreenWarning(false);
        clearInterval(timerRef.current);
        startTimer();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleNext = () => {
 
    // if (!selectedOption) {
    //   alert("Please select an option!");
    //   return;
    // }
    checkAnswer();
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    localStorage.setItem("currentQuestionIndex", nextIndex);
  };
 



  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  if (fullscreenWarning) {
    const requestFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    };
    
    if (fullscreenWarning) {
      return (
        <div className="w-[500px] m-3 shadow-2xl bg-white rounded p-10 flex flex-col gap-5">
          <p className="flex gap-1  items-center">
            <CiWarning size={20} />
            Warning
          </p>
          <p>Please enable full screen to take the quiz.</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-2 w-[170px] bg-black text-white rounded"
              onClick={requestFullscreen}
            >
              Enable Full Screen
            </button>
            <Link to={"/"}>
              <button className="px-3 py-2 w-[100px] ml-[10px] bg-white text-black border-[1px] border-black border-solid rounded">
                Exit
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return <div>Quiz completed!</div>;
  }

  const question = questions[currentQuestionIndex];

  const handleSubmit = () => {
    navigate("/scorecard");
    localStorage.setItem('score' , score);
    document.exitFullscreen();
  };
  
  
  
 const onAnswerSelection = (option) =>{
  if(selectedAnswer.includes(option)){
   
   var tempAnswer = selectedAnswer.filter((item)=>item!== option);
   setSelectedAnswer(tempAnswer)
  }else{
    selectedAnswer.push(option)
   
  }
  
   
 }


 const compareArrays = (a, b) =>
  a.length === b.length &&
  a.every((element, index) => element === b[index]);


  const checkAnswer = () => {
    const arr1 = [...selectedAnswer].sort();
    const arr2 = [...question.answer].sort();
    // console.log(arr1 , arr2)
    if(compareArrays(arr1 , arr2 )){
      
      setScore((prev)=>prev+10);
    }
    // console.log(selectedAnswer , question.answer)
    // console.log(compareArrays(arr1 , arr2))
    // console.log(score);
    setSelectedAnswer([]);
  }

  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });
  console.log(selectedAnswer)
  return (
    <div className="bg-white m-3 py-7 w-full sm:w-[40%] px-10 flex flex-col gap-7 rounded-xl">
    <span className="text-sm"><span className="text-4xl text-red-400">{question.id}</span>/{questions.length}</span>
      <span
        className={`${
          minutes < 2 ? "text-red-500" : "text-black"
        } text-right font-bold text-2xl flex gap-1 justify-end items-center`}
      ><MdOutlineWatchLater className="inline" size={27} />{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</span>
      <div className="flex flex-col gap-7">
        <h2 className="font-semibold text-xl">
          {question.id}.{question.question}
        </h2>
        <ul className="flex flex-col gap-3">
          {question.options.map((option , i) => (
            <li key={option} className={`${selectedAnswer.includes(option) ? " bg-black text-white " : " " } options px-7 border rounded-full py-3 hover:border-black hover:border-[-3px]`} onClick={()=>onAnswerSelection(option)}>
              {String.fromCharCode(64 + i + 1)}. {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-right">
        
        {currentQuestionIndex === 9 ? (
          <button
            className="bg-black text-white px-6 rounded py-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-black text-white px-6 rounded py-2"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
