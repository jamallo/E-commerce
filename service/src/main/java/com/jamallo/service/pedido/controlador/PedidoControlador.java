package com.jamallo.service.pedido.controlador;

import com.jamallo.service.pedido.dto.CheckoutRequestDTO;
import com.jamallo.service.pedido.dto.PedidoResponseDTO;
import com.jamallo.service.pedido.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoControlador {

    private final PedidoService pedidoService;

    @PostMapping("/checkout")
    public ResponseEntity<PedidoResponseDTO> checkout(
            @RequestBody CheckoutRequestDTO dto,
            Authentication authentication
            ) {
        String email = authentication.getName();
        return ResponseEntity.ok(pedidoService.checkout(email, dto));
    }
}