package com.jamallo.service.producto.servicio;

import com.jamallo.service.excepcion.RecursoNoEncontradoException;
import com.jamallo.service.producto.dto.ProductoRequestDTO;
import com.jamallo.service.producto.modelo.Producto;
import com.jamallo.service.producto.repositorio.ProductoRepository;
import com.jamallo.service.producto.servicio.ProductoService;
import com.jamallo.service.producto.util.ProductoMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }


    @Override
    public Producto crear (Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public List<Producto> listarTodos() {

        return productoRepository.findAll();
    }

    @Override
    public Optional<Producto> buscarPorId(Long id) {

        return productoRepository.findById(id);
    }

    @Override
    public void eliminar(Long id) {

        productoRepository.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, ProductoRequestDTO dto) {
        Producto existente = productoRepository
                .findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado" + id));

        existente.setNombre(dto.getNombre());
        existente.setPrecio(dto.getPrecio());
        existente.setDescripcion(dto.getDescripcion());
        existente.setActivo(dto.getActivo());


        return productoRepository.save(existente);
    }
}