import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
const Score = () => {
  const score = localStorage.getItem('score')
  const name = localStorage.getItem('name');
  return (
    <div className='bg-white p-10 text-center text-black w-[400px] flex flex-col justify-center items-center gap-7'>
    <div className='text-2xl'>Hey! {name} 👋🏻</div>
    <div className='font-bold text-2xl'>Successfully Completed Quiz</div>
    <FaCheckCircle size={100} />
    
     <div className={`text-lg font-semibold ${score < 60 ? "text-red-500" : "text-green-500 "}`}>Your Score is {score}</div>
   <Link to={'/'}><button className='bg-black text-white px-3 py-2 rounded flex gap-2 justify-center items-center'> <FaHome size={17} /> Go To Home</button></Link>
    </div>
  )
}

export default Score
