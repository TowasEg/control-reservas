package org.trescerditos.reservas.repositories.generic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.trescerditos.reservas.entities.generic.IEntidadLogicaGenerica;

import java.util.List;

@NoRepositoryBean
public interface IRespositorioGenericoLogico<T extends IEntidadLogicaGenerica> extends JpaRepository<T, Integer> {

    @Query("SELECT entity FROM #{#entityName} entity WHERE entity.active = true")
    List<T> findAllActive();
}
