package org.trescerditos.reservas.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.trescerditos.reservas.entities.Reserva;
import org.trescerditos.reservas.repositories.generic.IRespositorioGenericoLogico;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends IRespositorioGenericoLogico<Reserva> {

    @Query("SELECT r FROM Reserva r WHERE r.fechaReserva = :fecha")
    List<Reserva> findByFechaReserva(@Param("fecha") LocalDate fecha);

    @Query("SELECT r FROM Reserva r WHERE r.idCliente.id = :idCliente")
    List<Reserva> findByIdCliente(@Param("idCliente") Integer idCliente);

    @Query("SELECT r FROM Reserva r WHERE r.fechaReserva = :fechaReserva AND r.idCliente.id = :idCliente")
    List<Reserva> findByFechaReservaAndIdCliente(@Param("fechaReserva") LocalDate fechaReserva, @Param("idCliente") Integer idCliente);
}