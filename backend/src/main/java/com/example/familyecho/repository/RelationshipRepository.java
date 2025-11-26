package com.example.familyecho.repository;

import com.example.familyecho.model.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, Long> {
    
    // Find all relationships involving a specific member
    @Query("SELECT r FROM Relationship r WHERE r.member1Id = :memberId OR r.member2Id = :memberId")
    List<Relationship> findByMemberId(@Param("memberId") Long memberId);
    
    // Find relationships by type
    List<Relationship> findByRelationshipType(String relationshipType);
    
    // Find specific relationship between two members
    @Query("SELECT r FROM Relationship r WHERE (r.member1Id = :member1Id AND r.member2Id = :member2Id) OR (r.member1Id = :member2Id AND r.member2Id = :member1Id)")
    List<Relationship> findByMemberIds(@Param("member1Id") Long member1Id, @Param("member2Id") Long member2Id);
}
