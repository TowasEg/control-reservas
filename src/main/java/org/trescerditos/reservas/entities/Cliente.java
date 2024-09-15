package org.trescerditos.reservas.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.trescerditos.reservas.entities.generic.IEntidadLogicaGenerica;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "clientes", schema = "sistema_reservas")
public class Cliente implements IEntidadLogicaGenerica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente", nullable = false)
    private Integer id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;


    @Column(name = "active")
    private Boolean active;

}