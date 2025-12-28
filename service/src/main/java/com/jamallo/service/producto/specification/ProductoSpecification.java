package com.jamallo.service.producto.specification;

import com.jamallo.service.producto.modelo.Producto;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class ProductoSpecification {

    public static Specification<Producto> filtrar (
            String nombre,
            Boolean activo,
            BigDecimal precioMin,
            BigDecimal precioMax
    ){
        return ((root, query, criteriaBuilder) -> {

            var predicates = criteriaBuilder.conjunction();

            if (nombre != null && !nombre.isBlank()) {
                predicates.getExpressions().add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("nombre")),
                        "%" + nombre.toLowerCase() + "%"
                ));
            }

            if (activo != null) {
                predicates.getExpressions().add(
                        criteriaBuilder.equal(root.get("activo"), activo)
                );
            }

            if (precioMin != null) {
                predicates.getExpressions().add(
                        criteriaBuilder.greaterThanOrEqualTo(root.get("precio"), precioMin)
                );
            }

            if (precioMax != null) {
                predicates.getExpressions().add(
                        criteriaBuilder.lessThanOrEqualTo(root.get("precio"), precioMax)
                );
            }

            return predicates;
        });

    }
}