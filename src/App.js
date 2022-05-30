import React  from 'react';
import { GlobalStyle,Container} from './components/index';
import {Home, Register, Login} from './pages/index'
import {Header, Footer} from './components/index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import { InfoPanel } from './pages/InfoPanel/InfoPanel';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { EditUser } from './pages/InfoPanel/EditUser';
import { Schedule } from './pages/Schedule/Schedule';
import { EditProfile } from './pages/InfoPanel/EditProfile';
import { ListUser } from './pages/InfoPanel/ListUser';

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
                <Route exact path="/usuarios" element={<InfoPanel/>} />
                <Route exact path="/alterar-senha" element={<ForgotPassword/>} />
                <Route exact path="/redefinir-senha" element={<ResetPassword/>} />
                <Route exact path="/editar-usuario/:uuid" element={<EditUser/>} />
                <Route exact path="/editar-perfil/:uuid" element={<EditProfile/>} />
                <Route exact path="/list-usuarios" element={<ListUser/>} />
                <Route exact path="/agendar-consulta" element={<Schedule/>} />
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
