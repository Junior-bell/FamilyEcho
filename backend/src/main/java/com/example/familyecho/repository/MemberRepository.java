package com.example.familyecho.repository;

import com.example.familyecho.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // Additional query methods can be defined here if needed
}
