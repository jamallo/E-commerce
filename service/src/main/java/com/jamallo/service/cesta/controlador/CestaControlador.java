package com.jamallo.service.cesta.controlador;

import com.jamallo.service.cesta.dto.CestaItemDTO;
import com.jamallo.service.cesta.dto.CestaResponseDTO;
import com.jamallo.service.cesta.mapper.CestaMapper;
import com.jamallo.service.cesta.modelo.Cesta;
import com.jamallo.service.cesta.servicio.CestaService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cesta")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class CestaControlador {

    private final CestaService cestaService;

    @GetMapping
    public ResponseEntity<CestaResponseDTO> obtenerCesta(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                cestaService.obtenerOCrearPorEmail(email)
        );
    }

    @PostMapping
    public void guardarCesta(
            @AuthenticationPrincipal Authentication authentication,
            @RequestBody List<CestaItemDTO> items
            ) {
        cestaService.actualizar(authentication.getName(), items);
    }

    @DeleteMapping
    public void vaciarCesta(@AuthenticationPrincipal Authentication authentication) {
        cestaService.vaciar(authentication.getName());
    }
}