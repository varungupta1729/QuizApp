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
    <div className='w-full md:w-[400px] rounded  bg-white border p-10 flex flex-col gap-10 items-center justify-between'>
     <p className='text-3xl'>Quiz App</p>
     <form className='gap-4 flex flex-col' onSubmit={handleStart}>
     <input className='w-full py-3  rounded px-7 border' type='text' placeholder='Enter Your Name'value={name}  onChange={(e)=>setName(e.target.value)} required />
     <button className='w-full rounded bg-black text-white py-3' >Start Quiz</button>
     </form>
     
      
      
    </div>
  )
}

export default Home
