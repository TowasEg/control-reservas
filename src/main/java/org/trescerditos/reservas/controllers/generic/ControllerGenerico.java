package org.trescerditos.reservas.controllers.generic;

import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value = "Se obtienen toda la información de una entidad", notes = "Obtiene información de una entidad de forma génerica.")
    public List<T> findAll() {
        return servicioLogicoGenerico.findAll();
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Se obtienen la información de un registro en específico buscado por el id", notes = "Obtiene información de un registro de una entidad de forma génerica.")
    public T get(@PathVariable Integer id) {
        return servicioLogicoGenerico.get(id);
    }

    @PutMapping("")
    @ApiOperation(value = "Actualiza los registris de uba entidad", notes = "Actualiza los registro de una entidad de forma abstracta.")
    public T update(@RequestBody T registro) {
        return servicioLogicoGenerico.update(registro);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Elimina de manera lógica una entidad", notes = "Cambia el estado a FALSE para que no se muestre.")

    public void delete(@PathVariable Integer id) {
        servicioLogicoGenerico.delete(id);
    }

    @PostMapping("")
    @ApiOperation(value = "Se crea un nuevo registro de la entidad", notes = "Se crea un nuevo registro de la entidad de forma génerica.")

    public T save(@RequestBody T registro) {
        return servicioLogicoGenerico.create(registro);
    }

}
