package org.trescerditos.reservas.controllers.generic;

import org.springframework.web.bind.annotation.*;
import org.trescerditos.reservas.entities.generic.IEntidadLogicaGenerica;
import org.trescerditos.reservas.services.generic.ServicioLogicoGenerico;

import java.util.List;

public class ControllerGenerico<T extends IEntidadLogicaGenerica> {

    protected final ServicioLogicoGenerico<T> servicioLogicoGenerico;

    public ControllerGenerico(ServicioLogicoGenerico<T> servicioLogicoGenerico) {
        this.servicioLogicoGenerico = servicioLogicoGenerico;
    }

    @GetMapping("")
    public List<T> findAll() {
        return servicioLogicoGenerico.findAll();
    }

    @GetMapping("/{id}")
    public T get(@PathVariable Integer id) {
        return servicioLogicoGenerico.get(id);
    }

    @PutMapping("")
    public T update(@RequestBody T registro) {
        return servicioLogicoGenerico.update(registro);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        servicioLogicoGenerico.delete(id);
    }

    @PostMapping("")
    public T save(@RequestBody T registro) {
        return servicioLogicoGenerico.create(registro);
    }

}
