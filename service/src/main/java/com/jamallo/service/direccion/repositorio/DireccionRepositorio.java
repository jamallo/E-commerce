package com.jamallo.service.direccion.repositorio;

import com.jamallo.service.direccion.modelo.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DireccionRepositorio extends JpaRepository<Direccion, Long> {

    List<Direccion> findByUsuarioEmail(String email);
}
