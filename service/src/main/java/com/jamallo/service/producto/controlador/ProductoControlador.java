package com.jamallo.service.producto.controlador;

import com.jamallo.service.producto.dto.ProductoRequestDTO;
import com.jamallo.service.producto.dto.ProductoResponseDTO;
import com.jamallo.service.producto.modelo.Producto;
import com.jamallo.service.producto.servicio.ProductoService;
import com.jamallo.service.producto.util.ProductoMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoControlador {

    private final ProductoService productoService;

    //Crear producto - SOLO ADMINISTRADOR
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crear(@Valid @RequestBody ProductoRequestDTO dto) {
        Producto producto = ProductoMapper.toEntity(dto);
        Producto guardado = productoService.crear(producto);
        return ResponseEntity.ok(ProductoMapper.toDTO(guardado));
    }

    //Listar productos - PÚBLICO
    @GetMapping
    public ResponseEntity<List<ProductoResponseDTO>> listar() {
        return ResponseEntity.ok(
                productoService.listarTodos()
                        .stream()
                        .map(ProductoMapper::toDTO)
                        .toList());
    }

    //PÚBLICO
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtener(@PathVariable Long id) {
        return productoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //SOLO ADMINISTRADOR
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    //solo ADMINISTRADOR
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> actualizar(@PathVariable Long id, @RequestBody ProductoRequestDTO dto) {

        Producto productoActualizado = productoService.actualizar(id, dto);
        return ResponseEntity.ok((ProductoMapper.toDTO(productoActualizado)));
    }
}