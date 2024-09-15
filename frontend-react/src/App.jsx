import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClientForm from './components/client/ClienteForm';
import Clients from './components/client/Cliente';
import ReservaForm from './components/reserva/ReservaForm';
import Reservas from './components/reserva/Reserva';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<h2>Bienvenido a ReservaApp</h2>} />
            <Route path='/clientes' element={<Clients/>} /> 
            <Route path='/clienteForm/:id?' element={<ClientForm/>} />
            <Route path='/reservas' element={<Reservas/>} /> 
            <Route path='/reservaForm/:id?' element={<ReservaForm/>} />

          {/*<Route path="/reservas" element={<Reservas />} />
          <Route path="/clientes" element={<Clientes />} /> */}

        </Routes>
      </div>
    </Router>
  );
}


export default App
