import { Link } from 'react-router-dom';
import { request } from '../../help/helper-axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import './Clients.css';

const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        request("GET", "/cliente").then(response => {
            setClients(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className="table-container">
            <Card className="clients-card">
                <CardHeader>
                    <h2>Lista de Clientes</h2>
                    <Link to="/clienteForm" className="btn btn-primary">Crear Cliente</Link>
                </CardHeader>
                <CardBody>
                    <Table responsive className="clients-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.id}</td>
                                    <td>{client.nombre}</td>
                                    <td>{client.email}</td>
                                    <td>{client.telefono}</td>
                                    <td>
                                        <Link to={`/clienteForm/${client.id}`}>Editar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};

export default Clients;
