package com.example.springboot02.service;

import com.example.springboot02.entity.Problem;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProblemService {

    List<Problem> getAllProblems();
    int addProblem(Problem problem);
    int delProblem(int id);
    List<Problem> getProblem(String title);
    int updateProblem(int id,Problem problem);
    int showProblem(int id);
}
