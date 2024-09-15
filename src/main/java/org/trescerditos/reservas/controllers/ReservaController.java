package org.trescerditos.reservas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.AbstractController;
import org.trescerditos.reservas.controllers.generic.ControllerGenerico;
import org.trescerditos.reservas.entities.Reserva;
import org.trescerditos.reservas.repositories.ReservaRepository;
import org.trescerditos.reservas.services.generic.ServicioLogicoGenerico;

@RestController
@RequestMapping("/api/reserva")
public class ReservaController extends ControllerGenerico<Reserva> {

    @Autowired
    public ReservaController(ReservaRepository repository) {
        super(new ServicioLogicoGenerico<>(repository));
    }

}
