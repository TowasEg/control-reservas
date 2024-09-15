package org.trescerditos.reservas.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.trescerditos.reservas.entities.generic.IEntidadLogicaGenerica;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "reservas", schema = "sistema_reservas")
public class Reserva implements IEntidadLogicaGenerica {
    @Id
    @Column(name = "id_reserva", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente idCliente;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_mesa", nullable = false)
    private Mesa idMesa;

    @Column(name = "fecha_reserva", nullable = false)
    private LocalDate fechaReserva;

    @Column(name = "hora_reserva", nullable = false)
    private LocalTime horaReserva;

    @Column(name = "num_personas", nullable = false)
    private Integer numPersonas;

    @ColumnDefault("'confirmada'")
    @Lob
    @Column(name = "estado")
    private String estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @Column(name = "active")
    private Boolean active;

}