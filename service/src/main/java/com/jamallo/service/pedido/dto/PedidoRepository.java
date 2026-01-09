package com.jamallo.service.pedido.dto;

import com.jamallo.service.pedido.modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}