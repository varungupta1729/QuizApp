import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";

function App() {
  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scorecard" element={<Score/>} />
      </Routes>
    </div>
  );
}

export default App;
