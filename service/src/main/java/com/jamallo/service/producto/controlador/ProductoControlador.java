package com.jamallo.service.producto.controlador;

import com.jamallo.service.producto.dto.PaginaResponseDTO;
import com.jamallo.service.producto.dto.ProductoRequestDTO;
import com.jamallo.service.producto.dto.ProductoResponseDTO;
import com.jamallo.service.producto.servicio.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoControlador {

    private final ProductoService productoService;

    //Crear producto - SOLO ADMINISTRADOR
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crear(@Valid @RequestBody ProductoRequestDTO dto) {
        /*Producto producto = ProductoMapper.toEntity(dto);
        Producto guardado = productoService.crear(producto);*/
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.crear(dto));
    }

    //Listar productos - PÚBLICO
    //@GetMapping
    /*public ResponseEntity<List<ProductoResponseDTO>> listar() {
        return ResponseEntity.ok(
                productoService.listarTodos());
    }*/

    //PÚBLICO
    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.buscarPorId(id));
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
    public ResponseEntity<ProductoResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ProductoRequestDTO dto) {


        return ResponseEntity.ok((productoService.actualizar(id, dto)));
    }

    //@GetMapping
    public ResponseEntity<PaginaResponseDTO<ProductoResponseDTO>> listarPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {
        return ResponseEntity.ok(productoService.listarPaginado(page, size, sortBy));
    }

    @GetMapping
    public ResponseEntity<PaginaResponseDTO<ProductoResponseDTO>> filtrar (
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Boolean activo,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy

            ) {
        return ResponseEntity.ok(
                productoService.filtrar(nombre, activo, precioMin, precioMax, page, size, sortBy)
        );
    }
}