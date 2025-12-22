package com.jamallo.service.producto.servicio;

import com.jamallo.service.producto.modelo.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {

    Producto guardar (Producto producto);

    List<Producto> listarTodos();

    Optional<Producto> buscarPorId(Long id);

    void eliminar(Long id);
}