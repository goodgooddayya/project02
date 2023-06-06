package com.example.springboot02.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springboot02.entity.Chart;
import com.example.springboot02.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/chart")
public class ChartController {

    @Autowired
    private ChartService chartService;

    @GetMapping("/getAllCharts")
    public List<Chart> getAllCharts(){
        return chartService.getAllCharts();
    }

    @GetMapping("/getYesterChart/{date}")
    public List<Chart> getYesterChart(@PathVariable("date")  String date){
        return chartService.getYesterChart(date);
    }

    @PostMapping("/addChart")
    public int addChart(@RequestBody Chart chart){
        return chartService.addChart(chart);
    }
}
