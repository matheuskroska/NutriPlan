import { GlobalStyle,Container} from './components/index';
import {Home, Register, Login} from './pages/index'
import {Header, Footer} from './components/index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Header/>
        <Container>
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/cadastro" element={<Register/>} />                      
              <Route element={() => <h1>NOT FOUND</h1>} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
