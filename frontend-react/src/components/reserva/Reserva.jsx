import { Link } from 'react-router-dom';
import { request } from '../../help/helper-axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Table, Button, Input, FormGroup, Label } from 'reactstrap';
import '../client/Clients.css';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [clienteFiltro, setClienteFiltro] = useState('');

    useEffect(() => {
        // Cargar reservas y clientes
        const fetchData = async () => {
            try {
                const reservasResponse = await request("GET", "/reserva/filtros");
                setReservas(reservasResponse.data);

                const clientesResponse = await request("GET", "/cliente"); // Asegúrate de tener un endpoint para obtener clientes
                setClientes(clientesResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Aplicar filtro si hay fecha o cliente seleccionado
        const fetchFilteredReservas = async () => {
            try {
                const response = await request("GET", `/reserva/filtros?fecha=${fechaFiltro}&cliente=${clienteFiltro}`);
                setReservas(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (fechaFiltro || clienteFiltro) {
            fetchFilteredReservas();
        }
    }, [fechaFiltro, clienteFiltro]);

    const handleCancel = async (id) => {
        try {
            await request("PUT", `/reserva/${id}/cancelar`);
            setReservas(prevReservas =>
                prevReservas.map(reserva =>
                    reserva.id === id ? { ...reserva, estado: 'Cancelado' } : reserva
                )
            );
        } catch (error) {
            console.error("Error al cancelar la reserva", error);
        }
    };

    return (
        <div className="table-container">
            <Card className="clients-card">
                <CardHeader>
                    <h2>Lista de Reservas</h2>
                    <Link to="/reservaForm" className="btn btn-primary">Crear Nueva Reserva</Link>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="fechaFiltro">Filtrar por Fecha</Label>
                        <Input
                            type="date"
                            id="fechaFiltro"
                            value={fechaFiltro}
                            onChange={(e) => setFechaFiltro(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="clienteFiltro">Filtrar por Cliente</Label>
                        <Input
                            type="select"
                            id="clienteFiltro"
                            value={clienteFiltro}
                            onChange={(e) => setClienteFiltro(e.target.value)}
                        >
                            <option value="">Seleccione un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Table responsive className="clients-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre cliente</th>
                                <th>Fecha reserva</th>
                                <th>Hora Reserva</th>
                                <th>Personas</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.id}</td>
                                    <td>{reserva.idCliente.nombre}</td>
                                    <td>{reserva.fechaReserva}</td>
                                    <td>{reserva.horaReserva}</td>
                                    <td>{reserva.numPersonas}</td>
                                    <td>{reserva.estado}</td>
                                    <td>
                                        <Link to={`/reservaForm/${reserva.id}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                        {reserva.estado !== 'Cancelado' && (
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleCancel(reserva.id)}
                                            >
                                                Cancelar
                                            </Button>
                                        )}
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

export default Reservas;
