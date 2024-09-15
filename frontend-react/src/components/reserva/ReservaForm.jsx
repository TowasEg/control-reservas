import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { request } from '../../help/helper-axios';
import { useForm, Controller } from 'react-hook-form';
import '../client/Clients.css';

function ReservaForm() {
    const params = useParams();
    const [successSubmit, setSuccessSubmit] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            idCliente: '',
            fechaReserva: '',
            horaReserva: '',
            numPersonas: '',
            estado: 'reservado', // Valor predeterminado para estado
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            fetchClientes();
            setLoading(true);
            if (params.id) {
                await request("GET", `/reserva/${params.id}`).then(response => {
                    setValue("idCliente", response.data.idCliente.id)
                    setValue("fechaReserva", response.data.fechaReserva)
                    setValue("horaReserva", response.data.horaReserva)
                    setValue("numPersonas", response.data.numPersonas)
                    setValue("estado", response.data.estado)
                })
            }
            setLoading(false);
        }
        fetchData();
    }, [params.id, setValue]);

    const fetchClientes = async () => {
        try {
            const response = await request("GET", "/cliente");
            setClientes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    async function onSubmit(data) {
        setSuccessSubmit(false);
        setLoadingSubmit(true);
        try {
            await request(params.id ? "PUT" : "POST", "/reserva", {
                ...(params.id ? { id: params.id } : {}),
                idCliente: {id: data.idCliente},
                fechaReserva: data.fechaReserva,
                horaReserva: data.horaReserva,
                numPersonas: data.numPersonas,
                estado: 'reservado', // Establece el estado como "reservado"
            });
            setSuccessSubmit(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingSubmit(false);
        }
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (successSubmit) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h4>¡Operación exitosa!</h4>
                <button style={{ backgroundColor: "#646cff", color: "white", border: "none", borderRadius: "5px", padding: "10px 20px" }}>
                    <Link to="/reservas" style={{ color: "white", textDecoration: "none" }}>
                        Ir a Reservas
                    </Link>
                </button>
            </div>
        );
    }

    return (
        <div className="table-container">
            <div className="form-container">
                <h2>{params.id ? 'Editar Reserva' : 'Crear Reserva'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="idCliente">Cliente:</label>
                        <Controller
                            name="idCliente"
                            control={control}
                            render={({ field }) => (
                                <select {...field} id="idCliente">
                                    <option value="">Seleccione un cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nombre}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaReserva">Fecha Reserva:</label>
                        <Controller
                            name="fechaReserva"
                            control={control}
                            render={({ field }) => (
                                <input type="date" {...field} id="fechaReserva" />
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="horaReserva">Hora Reserva:</label>
                        <Controller
                            name="horaReserva"
                            control={control}
                            render={({ field }) => (
                                <input type="time" {...field} id="horaReserva" />
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="numPersonas">Número de Personas:</label>
                        <Controller
                            name="numPersonas"
                            control={control}
                            render={({ field }) => (
                                <input type="number" {...field} id="numPersonas" />
                            )}
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={loadingSubmit}>
                            {loadingSubmit ? 'Enviando...' : 'Guardar Reserva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReservaForm;
