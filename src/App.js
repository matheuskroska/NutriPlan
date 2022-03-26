import { GlobalStyle,Container} from './components/index';
import {Home, Register, Login} from './pages/index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/cadastro" element={<Register/>} />                      
            <Route element={() => <h1>NOT FOUND</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
