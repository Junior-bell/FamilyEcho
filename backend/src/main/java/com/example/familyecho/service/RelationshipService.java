package com.example.familyecho.service;

import com.example.familyecho.model.Relationship;
import com.example.familyecho.repository.RelationshipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RelationshipService {

    private final RelationshipRepository repository;

    public RelationshipService(RelationshipRepository repository) {
        this.repository = repository;
    }

    public List<Relationship> findAll() {
        return repository.findAll();
    }

    public Relationship findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Relationship not found with id: " + id));
    }

    public List<Relationship> findByMemberId(Long memberId) {
        return repository.findByMemberId(memberId);
    }

    public List<Relationship> findByRelationshipType(String relationshipType) {
        return repository.findByRelationshipType(relationshipType);
    }

    public List<Relationship> findByMemberIds(Long member1Id, Long member2Id) {
        return repository.findByMemberIds(member1Id, member2Id);
    }

    public Relationship save(Relationship relationship) {
        // Validate that member IDs are different
        if (relationship.getMember1Id().equals(relationship.getMember2Id())) {
            throw new IllegalArgumentException("A member cannot have a relationship with themselves");
        }
        return repository.save(relationship);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
