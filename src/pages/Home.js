import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate =  useNavigate();
    const [name , setName] = useState('');
    const handleStart = () =>{
       localStorage.setItem('name' , name);
       localStorage.setItem('timer' , 600);
       localStorage.setItem('currentQuestionIndex' , 0);
       localStorage.setItem('score' , 0)
       
       
       navigate('/quiz');
    }
   
  return (
    <div className='w-full m-3 sm:w-[400px] rounded  bg-white border p-10 flex flex-col gap-10 items-center justify-between'>
    <img className='w-[180px] ' src='https://st2.depositphotos.com/4398873/7554/v/450/depositphotos_75545389-stock-illustration-quiz-multicolor-letters.jpg' alt='' />
     {/* <p className='text-3xl'>Quiz App</p> */}
     <form className='gap-4 flex flex-col' onSubmit={handleStart}>
     <input className='w-full py-3  rounded px-7 border' type='text' placeholder='Enter Your Name'value={name}  onChange={(e)=>setName(e.target.value)} required />
     <button className='w-full rounded bg-black text-white py-3' >Start Quiz</button>
     </form>
     
      
      <p className='text-gray-700'>Made By Varun Gupta ❤️</p>
    </div>
  )
}

export default Home
