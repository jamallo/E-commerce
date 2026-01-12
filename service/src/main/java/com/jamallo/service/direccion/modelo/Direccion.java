package com.jamallo.service.direccion.modelo;

import com.jamallo.service.entidad.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Direccion {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Usuario usuario;

    private String nombre;
    private String apellidos;
    private String dirección;
    private String ciudad;
    private String codigoPostal;
    private String provincia;
    private String telefono;
}
