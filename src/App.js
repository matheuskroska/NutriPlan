import React  from 'react';
import { GlobalStyle,Container} from './components/index';
import {Home, Register, Login} from './pages/index'
import {Header, Footer} from './components/index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { EditUser } from './pages/InfoPanel/EditUser';
import { MakeAppointment } from './pages/Appointment/MakeAppointment';
import { EditProfile } from './pages/InfoPanel/EditProfile';
import { ListUser } from './pages/InfoPanel/ListUser';
import { ListAppointment } from './pages/InfoPanel/ListAppointment';
import { EditAppointment } from './pages/Appointment/EditAppointment';
import { Create } from './pages/Plan/Create';
import './i18n'

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
                <Route exact path="/alterar-senha" element={<ForgotPassword/>} />
                <Route exact path="/redefinir-senha" element={<ResetPassword/>} />
                <Route exact path="/editar-usuario/:uuid" element={<EditUser/>} />
                <Route exact path="/editar-perfil" element={<EditProfile/>} />
                <Route exact path="/lista-usuarios" element={<ListUser/>} />
                <Route exact path="/agendar-consulta" element={<MakeAppointment/>} />
                <Route exact path="/minhas-consultas" element={<ListAppointment/>} />
                <Route exact path="/editar-consulta/:docId" element={<EditAppointment/>} />
                <Route exact path="/criar-plano" element={<Create/>} />
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
