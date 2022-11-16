import React  from 'react';
import { GlobalStyle,Container} from './components/index';
import {Home, Register, Login, ForgotPassword, ResetPassword, EditUser, EditProfile, ListUser, MakeAppointment, ListAppointment, EditAppointment, PatientDashboard, Patient, Plan} from './pages/index'
import {Header, Footer} from './components/index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import './i18n'
import { Chat } from './components/Chat/Chat';
import { Dashboard } from './pages/Dashboard';

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
                <Route exact path="/dashboard" element={<Dashboard/>} />
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
                <Route exact path="/lista-pacientes" element={<Patient/>} />
                <Route exact path="/criar-plano/:uuid" element={<Plan/>} />
                <Route exact path="/editar-plano/:planId" element={<Plan/>} />
                <Route element={() => <h1>NOT FOUND</h1>} />
            </Routes>
          </Container>
          <Footer/>
        </Router>
        <Chat />
      </AuthProvider>
    </>
  );
}

export default App;
