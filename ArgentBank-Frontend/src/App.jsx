import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Footer from "./components/Footer";
import Login from "./pages/Login";
import User from "./pages/User";
import Error from "./pages/Error";

function App() {
  return (
      <>
      <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Home />}
          />
          <Route 
            path='/log-in' 
            element={<Login />}
          />
          <Route 
            path='/user' 
            element={<User />}
          />
          <Route 
            path='*' 
            element={<Error />} 
          />
        </Routes>
      <Footer/>
    </>

  )
}
export default App
