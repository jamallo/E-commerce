package com.jamallo.service.pedido.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoRepetirItemDTO {
    private Long productoId;
    private int cantidad;
}
