package com.example.familyecho.service;

import com.example.familyecho.model.Memory;
import com.example.familyecho.repository.MemoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MemoryService {

    private final MemoryRepository repo;

    public MemoryService(MemoryRepository repo) {
        this.repo = repo;
    }

    public List<Memory> findAll() {
        return repo.findAll();
    }

    public Memory findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Memory not found"));
    }

    public Memory save(Memory memory) {
        return repo.save(memory);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
