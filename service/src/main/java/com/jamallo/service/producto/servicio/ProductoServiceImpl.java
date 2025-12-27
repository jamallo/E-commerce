package com.jamallo.service.producto.servicio;

import com.jamallo.service.excepcion.RecursoNoEncontradoException;
import com.jamallo.service.producto.dto.PaginaResponseDTO;
import com.jamallo.service.producto.dto.ProductoRequestDTO;
import com.jamallo.service.producto.dto.ProductoResponseDTO;
import com.jamallo.service.producto.modelo.Producto;
import com.jamallo.service.producto.repositorio.ProductoRepository;
import com.jamallo.service.producto.servicio.ProductoService;
import com.jamallo.service.producto.util.ProductoMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ProductoResponseDTO crear (ProductoRequestDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setActivo(dto.getActivo());
        Producto guardado = productoRepository.save(producto);
        return ProductoMapper.toResponseDTO(guardado);
    }

    @Override
    public List<ProductoResponseDTO> listarTodos() {

        return productoRepository.findAll()
                .stream()
                .map(ProductoMapper::toResponseDTO)
                .toList();
    }

    @Override
    public Optional<ProductoResponseDTO> buscarPorId(Long id) {

        Producto producto =  productoRepository.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado con id " + id));

        return Optional.of(ProductoMapper.toResponseDTO(producto));
    }

    @Override
    public void eliminar(Long id) {

        productoRepository.deleteById(id);
    }

    @Override
    public ProductoResponseDTO actualizar(Long id, ProductoRequestDTO dto) {
        Producto existente = productoRepository
                .findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado" + id));

        ProductoMapper.actualizarEntidad(existente, dto);


        return ProductoMapper.toResponseDTO(productoRepository.save(existente));
    }

    @Override
    public PaginaResponseDTO<ProductoResponseDTO> listarPaginado(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending());

        Page<Producto> paginaProductos = productoRepository
                .findAll(pageable);

        List<ProductoResponseDTO> productos = paginaProductos
                .getContent()
                .stream()
                .map(ProductoMapper::toResponseDTO)
                .toList();

        return new PaginaResponseDTO<>(
                productos,
                paginaProductos.getNumber(),
                paginaProductos.getTotalPages(),
                paginaProductos.getTotalElements());
    }
}