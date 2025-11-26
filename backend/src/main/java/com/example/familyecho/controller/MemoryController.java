package com.example.familyecho.controller;

import com.example.familyecho.model.Memory;
import com.example.familyecho.service.MemoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class MemoryController {

    private final MemoryService service;

    public MemoryController(MemoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<Memory> getAllMemories() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Memory> getMemory(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public Memory createMemory(@RequestBody Memory memory) {
        return service.save(memory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Memory> updateMemory(@PathVariable Long id, @RequestBody Memory memory) {
        memory.setId(id);
        return ResponseEntity.ok(service.save(memory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemory(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
