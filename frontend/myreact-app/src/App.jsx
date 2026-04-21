
import {HashRouter as Router , Routes , Route , Navigate} from 'react-router-dom';
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
