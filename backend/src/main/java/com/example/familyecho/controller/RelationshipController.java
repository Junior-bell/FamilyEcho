package com.example.familyecho.controller;

import com.example.familyecho.model.Relationship;
import com.example.familyecho.service.RelationshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relationships")
@CrossOrigin(origins = "http://localhost:3000")
public class RelationshipController {

    private final RelationshipService service;

    public RelationshipController(RelationshipService service) {
        this.service = service;
    }

    @GetMapping
    public List<Relationship> getAllRelationships() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Relationship> getRelationship(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/member/{memberId}")
    public List<Relationship> getRelationshipsByMember(@PathVariable Long memberId) {
        return service.findByMemberId(memberId);
    }

    @GetMapping("/type/{relationshipType}")
    public List<Relationship> getRelationshipsByType(@PathVariable String relationshipType) {
        return service.findByRelationshipType(relationshipType);
    }

    @PostMapping
    public Relationship createRelationship(@RequestBody Relationship relationship) {
        return service.save(relationship);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Relationship> updateRelationship(@PathVariable Long id, @RequestBody Relationship relationship) {
        relationship.setId(id);
        return ResponseEntity.ok(service.save(relationship));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelationship(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
