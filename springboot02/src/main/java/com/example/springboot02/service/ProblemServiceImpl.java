package com.example.springboot02.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springboot02.entity.Problem;
import com.example.springboot02.mapper.ProblemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService{
    @Autowired
    private ProblemMapper problemMapper;

    @Override
    public List<Problem> getAllProblems() {
        return problemMapper.selectList(null);
    }

    @Override
    public int addProblem(Problem problem) {
        if(problemMapper.selectById(problem.getId())==null){
            problemMapper.insert(problem);
            return 1;
        }
        else
            return 0;
    }

    @Override
    public int delProblem(int id) {
        if(problemMapper.selectById(id)!=null){
            problemMapper.deleteById(id);
            return 1;
        }
        else
            return 0;
    }

    @Override
    public List<Problem> getProblem(String title) {
        QueryWrapper<Problem> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("title",title);
        return problemMapper.selectList(queryWrapper);
    }

    @Override
    public int updateProblem(int id, Problem problem) {
        if (problemMapper.selectById(id)!=null){
            return problemMapper.updateById(problem);
        }
        else return 0;
    }

    @Override
    public int showProblem(int id) {
        Problem problem=problemMapper.selectById(id);
        if(problem!=null){
            problem.setState(1);
            return 1;
        }
        else
            return 0;
    }
}
