package com.example.familyecho.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String name;
    
    @NotBlank(message = "Relationship is required")
    @Size(min = 1, max = 50, message = "Relationship must be between 1 and 50 characters")
    private String relationship;

    @Column(length = 500)
    private String photo; // URL or path to profile photo

    @Lob
    @Column(length = 2000)
    @Size(max = 2000, message = "Bio must not exceed 2000 characters")
    private String bio; // Biography/description

    @Column(length = 500)
    private String audioUrl; // URL to audio recording

    @Column(nullable = false)
    private Boolean isDeceased = false; // Whether the member is deceased

    private String birthDate; // Birth date in ISO format (e.g., "1960-05-15")

    private String deathDate; // Death date in ISO format (nullable)

    @ElementCollection
    @CollectionTable(name = "member_hobbies", joinColumns = @JoinColumn(name = "member_id"))
    @Column(name = "hobby")
    private Set<String> hobbies; // Collection of hobbies

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getRelationship() { return relationship; }
    public void setRelationship(String relationship) { this.relationship = relationship; }
    
    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
    
    public Boolean getIsDeceased() { return isDeceased; }
    public void setIsDeceased(Boolean isDeceased) { this.isDeceased = isDeceased; }
    
    public String getBirthDate() { return birthDate; }
    public void setBirthDate(String birthDate) { this.birthDate = birthDate; }
    
    public String getDeathDate() { return deathDate; }
    public void setDeathDate(String deathDate) { this.deathDate = deathDate; }
    
    public Set<String> getHobbies() { return hobbies; }
    public void setHobbies(Set<String> hobbies) { this.hobbies = hobbies; }
}
