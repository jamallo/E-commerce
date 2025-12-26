package com.jamallo.service.producto.servicio;

import com.jamallo.service.producto.dto.ProductoRequestDTO;
import com.jamallo.service.producto.modelo.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {

    Producto crear (Producto producto);

    List<Producto> listarTodos();

    Optional<Producto> buscarPorId(Long id);

    void eliminar(Long id);

    Producto actualizar (Long id, ProductoRequestDTO dto);
}