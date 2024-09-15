package org.trescerditos.reservas.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.trescerditos.reservas.entities.generic.IEntidadLogicaGenerica;

@Getter
@Setter
@Entity
@Table(name = "mesas", schema = "sistema_reservas")
public class Mesa implements IEntidadLogicaGenerica {
    @Id
    @Column(name = "id_mesa", nullable = false)
    private Integer id;

    @Column(name = "numero_mesa", nullable = false)
    private Integer numeroMesa;

    @Column(name = "capacidad", nullable = false)
    private Integer capacidad;

    @Column(name = "ubicacion", length = 50)
    private String ubicacion;

    @Column(name = "active")
    private Boolean active;

}