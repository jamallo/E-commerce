package com.jamallo.service.producto.repositorio;

import com.jamallo.service.producto.modelo.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {


    Page<Producto> findByNombreContainingIgnoreCaseAndActivoAndPrecioBetween(
            String nombre,
            Boolean activo,
            BigDecimal precioMin,
            BigDecimal precioMax,
            Pageable pageable);

    Page<Producto> findByNombreContainingIgnoreCase (
            String nombre,
            Pageable pageable
    );
}
