package org.trescerditos.reservas.services.generic;

import jakarta.transaction.Transactional;
import org.trescerditos.reservas.entities.generic.IEntidadLogicaGenerica;
import org.trescerditos.reservas.repositories.generic.IRespositorioGenericoLogico;

import java.util.List;

public class ServicioLogicoGenerico<T extends IEntidadLogicaGenerica> {

    protected final IRespositorioGenericoLogico<T> respositorioGenericoLogico;

    public ServicioLogicoGenerico(IRespositorioGenericoLogico<T> respositorioGenericoLogico) {
        this.respositorioGenericoLogico = respositorioGenericoLogico;
    }

    public List<T> findAll() {
        return respositorioGenericoLogico.findAll();
    }

    public T get(Integer id) {
        return respositorioGenericoLogico.findById(id)
                .filter(IEntidadLogicaGenerica::getActive)
                .orElseThrow(null);
    }

    @Transactional
    public T update(T record) {
        record.setActive(true);
        get(record.getId());
        return respositorioGenericoLogico.save(record);
    }

    @Transactional
    public void delete(Integer id) {
        T record = get(id);
        record.setActive(false);
        respositorioGenericoLogico.save(record);
    }

    @Transactional
    public T create(T record) {
        record.setActive(true);
        return respositorioGenericoLogico.save(record);
    }
}
