package com.example.familyecho.service;

import com.example.familyecho.model.Member;
import com.example.familyecho.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MemberService {

    private final MemberRepository repo;

    public MemberService(MemberRepository repo) {
        this.repo = repo;
    }

    public List<Member> findAll() {
        return repo.findAll();
    }

    public Member findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public Member save(Member member) {
        return repo.save(member);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
