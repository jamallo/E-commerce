package com.jamallo.service.pedido.service;

import com.jamallo.service.cesta.modelo.Cesta;
import com.jamallo.service.cesta.modelo.CestaItem;
import com.jamallo.service.cesta.repositorio.CestaRepository;
import com.jamallo.service.entidad.Usuario;
import com.jamallo.service.pedido.dto.CheckoutRequestDTO;
import com.jamallo.service.pedido.dto.PedidoRepository;
import com.jamallo.service.pedido.dto.PedidoResponseDTO;
import com.jamallo.service.pedido.modelo.EstadoPedido;
import com.jamallo.service.pedido.modelo.Pedido;
import com.jamallo.service.pedido.modelo.PedidoItem;
import com.jamallo.service.repositorio.RepositorioUsuario;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final CestaRepository cestaRepository;
    private final RepositorioUsuario usuarioRepository;

    @Transactional
    public PedidoResponseDTO checkout(String email, CheckoutRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Cesta cesta = cestaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST, "La cesta está vacía"));

        if (cesta.getItems().isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "La cesta está vacía");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setFechaCreacion(LocalDateTime.now());
        pedido.setItems(new ArrayList<>());

        pedido.setNombre(dto.getNombre());
        pedido.setApellidos(dto.getApellidos());
        pedido.setDireccion(dto.getDireccion());
        pedido.setCiudad(dto.getCiudad());
        pedido.setCodigoPostal(dto.getCodigoPostal());
        pedido.setTelefono(dto.getTelefono());

        BigDecimal total = BigDecimal.ZERO;

        for (CestaItem item : cesta.getItems()) {
            PedidoItem pedidoItem = new PedidoItem();
            pedidoItem.setPedido(pedido);
            pedidoItem.setProducto(item.getProducto());
            pedidoItem.setCantidad(item.getCantidad());
            pedidoItem.setPrecioUnitario(item.getProducto().getPrecio());

            total = total.add(
                    item.getProducto().getPrecio()
                            .multiply(BigDecimal.valueOf(item.getCantidad()))
            );

            pedido.getItems().add(pedidoItem);
        }

        pedido.setTotal(total);

        pedidoRepository.save(pedido);

        //VACIAR CESTA AUTOMÁTICAMENTE
        cesta.getItems().clear();
        cestaRepository.save(cesta);

        PedidoResponseDTO response = new PedidoResponseDTO();
        response.setId(pedido.getId());
        response.setTotal(pedido.getTotal());
        response.setEstado(pedido.getEstado().name());

        return response;
    }
}