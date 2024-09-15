import React from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { request } from '../../help/helper-axios';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import '../client/Clients.css'



function ClientForm() {
    const params = useParams();
    const [successSubmit, setSuccessSubmit] = useState(false);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            nombre: '',
            email: '',
            telefono: '',
        },
    });




    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (params.id) {

                await request("GET", `/cliente/${params.id}`).then(response => {

                    setValue("nombre", response.data.nombre)
                    setValue("email", response.data.email)
                    setValue("telefono", response.data.telefono)
                })

            }
            setLoading(false);
        }
        fetchData();
    }, []);


    async function onSubmit(data) {
        console.log(data)
        setSuccessSubmit(false)
        setLoadingSubmit(true)
        const responseData = await request(params.id ? "PUT" : "POST", "/cliente", {
            ...(params.id ? { id: params.id } : {}),
            nombre: data.nombre.trim(),
            email: data.email,
            telefono: data.telefono
        }).then(response => response.data);

        //    setSuccessId(responseData.id)
        //    setSuccessSubmit(true)
        setSuccessSubmit(true)
        setLoadingSubmit(false)
        //    form.reset()
    }
    if (loading) {
        return <div>Cargando...</div>
    }

    if (successSubmit) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h4>¡Operación exitosa!</h4>
                <button color="primary">
                    <Link to="/clientes" style={{ color: "white", textDecoration: "none" }}>
                        Ir a Clientes
                    </Link>
                </button>
            </div>
        );
    }
    return (
        <div>
            <h2>{params.id ? "Editar Cliente" : "Crear Cliente"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "600px", margin: "auto" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="nombre">Nombre:</label>
                    <Controller
                        name="nombre"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="nombre"
                                type="text"
                                placeholder="Ingresa el nombre"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                            />
                        )}
                    />
                </div>
    
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email">Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="Ingresa el email"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                            />
                        )}
                    />
                </div>
    
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="telefono">Teléfono:</label>
                    <Controller
                        name="telefono"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="telefono"
                                type="tel"
                                placeholder="Ingresa el teléfono"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                            />
                        )}
                    />
                </div>
    
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        type="submit"
                        disabled={loadingSubmit}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            color: "white",
                            backgroundColor: loadingSubmit ? "#ccc" : "#4caf50",
                            border: "none",
                            borderRadius: "4px",
                            cursor: loadingSubmit ? "not-allowed" : "pointer"
                        }}
                    >
                        {loadingSubmit ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </form>
        </div>
    );
    
}

export default ClientForm;
