package com.example.springboot02.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springboot02.entity.Chart;
import com.example.springboot02.mapper.ChartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ChartServiceImpl implements ChartService{
    @Autowired
    private ChartMapper chartMapper;

    @Override
    public List<Chart> getAllCharts() {
        return chartMapper.selectList(null);
    }

    /**
     * 时间转换成yyyy-MM-dd形式查找
     * @param date
     * @return
     */
    @Override
    public List<Chart> getYesterChart(String date) {
        /*SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String format = sdf.format(date);*/
        QueryWrapper<Chart> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("date",date);
        return chartMapper.selectList(queryWrapper);
    }

    @Override
    public int addChart(Chart chart) {
        return chartMapper.insert(chart);
    }
}
