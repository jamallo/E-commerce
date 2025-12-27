package com.jamallo.service.producto.servicio;

import com.jamallo.service.producto.dto.PaginaResponseDTO;
import com.jamallo.service.producto.dto.ProductoRequestDTO;
import com.jamallo.service.producto.dto.ProductoResponseDTO;
import com.jamallo.service.producto.modelo.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {

    ProductoResponseDTO crear (ProductoRequestDTO dto);

    List<ProductoResponseDTO> listarTodos();

    Optional<ProductoResponseDTO> buscarPorId(Long id);

    void eliminar(Long id);

    ProductoResponseDTO actualizar (Long id, ProductoRequestDTO dto);

    PaginaResponseDTO<ProductoResponseDTO> listarPaginado(int page, int size, String sortBy);
}