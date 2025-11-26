package com.example.familyecho.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "relationships")
public class Relationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "First member ID is required")
    @Column(name = "member1_id")
    private Long member1Id;

    @NotNull(message = "Second member ID is required")
    @Column(name = "member2_id")
    private Long member2Id;

    @NotNull(message = "Relationship type is required")
    @Column(length = 50)
    private String relationshipType; // parent, child, spouse, sibling, grandparent, grandchild, etc.

    @Column(length = 20)
    private String startDate; // ISO date string (e.g., marriage date, birth date)

    @Column(length = 20)
    private String endDate; // ISO date string (e.g., divorce date, death date) - nullable

    @Column(length = 500)
    private String notes; // Additional context about the relationship

    // Constructors
    public Relationship() {
    }

    public Relationship(Long member1Id, Long member2Id, String relationshipType) {
        this.member1Id = member1Id;
        this.member2Id = member2Id;
        this.relationshipType = relationshipType;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMember1Id() {
        return member1Id;
    }

    public void setMember1Id(Long member1Id) {
        this.member1Id = member1Id;
    }

    public Long getMember2Id() {
        return member2Id;
    }

    public void setMember2Id(Long member2Id) {
        this.member2Id = member2Id;
    }

    public String getRelationshipType() {
        return relationshipType;
    }

    public void setRelationshipType(String relationshipType) {
        this.relationshipType = relationshipType;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
