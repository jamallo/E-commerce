package com.jamallo.service.direccion.servicio;

import com.jamallo.service.direccion.modelo.Direccion;
import com.jamallo.service.direccion.repositorio.DireccionRepositorio;
import com.jamallo.service.entidad.Usuario;
import com.jamallo.service.repositorio.RepositorioUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DireccionService {

    private final RepositorioUsuario repositorioUsuario;
    private final DireccionRepositorio direccionRepositorio;

    @Transactional
    public Direccion guardarDireccion(String email, Direccion dto) {
        Usuario usuario = repositorioUsuario.findByEmail(email)
                .orElseThrow();

        dto.setUsuario(usuario);
        return direccionRepositorio.save(dto);
    }

    @Transactional(readOnly = true)
    public List<Direccion> obtenerDirecciones(String email) {
        return direccionRepositorio.findByUsuarioEmail(email);
    }
}
