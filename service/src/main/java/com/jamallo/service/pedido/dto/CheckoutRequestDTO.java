package com.jamallo.service.pedido.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CheckoutRequestDTO {

    private String nombre;
    private String apellidos;
    private String direccion;
    private String ciudad;
    private String codigoPostal;
    private String  telefono;
}