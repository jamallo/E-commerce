package com.jamallo.service.producto.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class PaginaResponseDTO <T> {
    private List<T> contenido;
    private int paginaActual;
    private int tamanioPaginas;
    private long totalElementos;
    private int totalPaginas;
}