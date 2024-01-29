import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Footer from "./components/Footer";

function App() {
  
    return (
      <>
      <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Home />}
          />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
