package org.trescerditos.reservas.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "horarios_restaurante", schema = "sistema_reservas")
public class HorariosRestaurante {
    @Id
    @Column(name = "id_horario", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "dia_semana", nullable = false)
    private String diaSemana;

    @Column(name = "hora_apertura", nullable = false)
    private LocalTime horaApertura;

    @Column(name = "hora_cierre", nullable = false)
    private LocalTime horaCierre;

}