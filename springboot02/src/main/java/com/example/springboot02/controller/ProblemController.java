package com.example.springboot02.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springboot02.entity.Problem;
import com.example.springboot02.service.ProblemService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/problem")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @GetMapping("/getAllProblems")
    public List<Problem> getAllProblems(){return problemService.getAllProblems();}

    @PostMapping("/addProblem")
    public int addProblem(@RequestBody Problem problem){
        return problemService.addProblem(problem);
    }

    @DeleteMapping("/delProblem/{id}")
    public int delProblem(@PathVariable("id") int id){
        return problemService.delProblem(id);
    }

    @GetMapping("/getProblem/{title}")
    @Operation(summary = "模糊标题查询")
    public List<Problem> getProblem(@PathVariable("title") String title){
        QueryWrapper<Problem> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("title",title);
        return problemService.getProblem(title);
    }

    @PutMapping("/updateProblem/{id}")
    public int updateProblem(@PathVariable("id") int id,@RequestBody Problem problem){
        return problemService.updateProblem(id,problem);
    }

    @PutMapping("/showProblem")
    public int showNotice(@PathVariable("id") int id){
        return problemService.showProblem(id);
    }
}
