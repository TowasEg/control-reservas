package org.trescerditos.reservas.entities;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(description = "Modelo de Reserva")
public class Reserva implements IEntidadLogicaGenerica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva", nullable = false)
    @ApiModelProperty(value = "ID de la reserva", example = "1")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_cliente", nullable = false)
    @ApiModelProperty(value = "idCliente", example = "Trae toda la info del cliente")
    private Cliente idCliente;


    @Column(name = "fecha_reserva", nullable = false)
    @ApiModelProperty(value = "Fecha de reserva", example = "2024-09-15")
    private LocalDate fechaReserva;

    @Column(name = "hora_reserva", nullable = false)
    @ApiModelProperty(value = "Hora de reserva", example = "18:00")
    private LocalTime horaReserva;

    @Column(name = "num_personas", nullable = false)
    @ApiModelProperty(value = "Número de personas", example = "4")
    private Integer numPersonas;


    @Column(name = "estado")
    @ApiModelProperty(value = "Estado de la reserva", example = "Confirmado")
    private String estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @Column(name = "active")
    @ApiModelProperty(value = "Estado", example = "TRUE or FALSE")
    private Boolean active;

}