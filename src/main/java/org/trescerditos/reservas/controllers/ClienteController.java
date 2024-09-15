package org.trescerditos.reservas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.trescerditos.reservas.controllers.generic.ControllerGenerico;
import org.trescerditos.reservas.entities.Cliente;
import org.trescerditos.reservas.repositories.ClienteRepository;
import org.trescerditos.reservas.services.generic.ServicioLogicoGenerico;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController extends ControllerGenerico<Cliente> {

    @Autowired
    public ClienteController(ClienteRepository repository) {
        super(new ServicioLogicoGenerico<>(repository));

    }
}
