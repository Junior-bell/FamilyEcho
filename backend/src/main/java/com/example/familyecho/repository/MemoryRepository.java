package com.example.familyecho.repository;

import com.example.familyecho.model.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryRepository extends JpaRepository<Memory, Long> {
    // Example custom query: find memories by a specific member ID
    // Note: Since memberIds is an ElementCollection, querying might be slightly different depending on needs,
    // but for simple cases or if we change to @ManyToMany, standard JPA methods apply.
    // For @ElementCollection of IDs, we might need a custom query or just filter in service if dataset is small,
    // or use a native query.
    // simpler approach for now:
}
