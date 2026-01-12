package com.jamallo.service.direccion.controlador;

import com.jamallo.service.direccion.modelo.Direccion;
import com.jamallo.service.direccion.servicio.DireccionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/direcciones")
@RequiredArgsConstructor
public class DireccionControlador {

    private final DireccionService direccionService;

    @GetMapping
    public List<Direccion> misDirecciones(Authentication authentication) {
        return direccionService.obtenerDirecciones(authentication.getName());
    }

    @PostMapping
    public Direccion guardar(@RequestBody Direccion direccion, Authentication authentication) {
        return direccionService.guardarDireccion(authentication.getName(), direccion);
    }
}
