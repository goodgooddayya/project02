package com.example.springboot02.service;


import com.example.springboot02.entity.Chart;

import java.util.Date;
import java.util.List;

public interface ChartService {
    List<Chart> getAllCharts();
    List<Chart> getYesterChart(String date);
    int addChart(Chart chart);
}
