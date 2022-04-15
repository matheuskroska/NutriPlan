import { GlobalStyle,Container} from './components/index';
import {Home, Register, Login} from './pages/index'
import {Header, Footer} from './components/index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import { Users } from './pages/User/Users';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { EditUser } from './pages/User/EditUser';

function App() {
  return (
    <>
      <GlobalStyle/>
      <AuthProvider>
        <Router>
          <Header/>
          <Container>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/cadastro" element={<Register/>} />
                <Route exact path="/usuarios" element={<Users/>} />
                <Route exact path="/alterar-senha" element={<ForgotPassword/>} />
                <Route exact path="/redefinir-senha" element={<ResetPassword/>} />
                <Route exact path="/editar-usuario/:uuid" element={<EditUser/>} />
                <Route element={() => <h1>NOT FOUND</h1>} />
            </Routes>
          </Container>
          <Footer/>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
