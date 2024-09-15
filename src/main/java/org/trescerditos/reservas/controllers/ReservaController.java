package org.trescerditos.reservas.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.AbstractController;
import org.trescerditos.reservas.controllers.generic.ControllerGenerico;
import org.trescerditos.reservas.entities.Reserva;
import org.trescerditos.reservas.repositories.ReservaRepository;
import org.trescerditos.reservas.services.generic.ServicioLogicoGenerico;

import java.time.LocalDate;
import java.util.List;

@RestController
@Api(tags = "Reservas")
@RequestMapping("/api/reserva")
public class ReservaController extends ControllerGenerico<Reserva> {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    public ReservaController(ReservaRepository repository) {
        super(new ServicioLogicoGenerico<>(repository));
    }

    @PutMapping("/{id}/cancelar")
    @ApiOperation(value = "Actualizar el estado de la reserva")
    public Reserva cancelarReserva(@PathVariable Integer id) {
        Reserva reserva = get(id);
        reserva.setEstado("Cancelado");
        return servicioLogicoGenerico.update(reserva);
    }

    @GetMapping("/filtros")
    @ApiOperation(value = "Obtener reservas con filtros", notes = "Obtiene reservas filtradas por fecha y/o cliente")
    public List<Reserva> getReservas(
            @RequestParam(value = "fecha", required = false) LocalDate fecha,
            @RequestParam(value = "cliente", required = false) Integer clienteId
    ) {
        if (fecha != null && clienteId != null) {
            return reservaRepository.findByFechaReservaAndIdCliente(fecha, clienteId);
        } else if (fecha != null) {
            return reservaRepository.findByFechaReserva(fecha);
        } else if (clienteId != null) {
            return reservaRepository.findByIdCliente(clienteId);
        }
        return findAll();
    }




}
