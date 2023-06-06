package com.example.springboot02.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@TableName("chart")
public class Chart {

    @TableId(value = "id",type = IdType.AUTO)
    private int id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private int amount;
    private int cancel;
    private int normal;
    private float avtime;
    private int onefloor;
    private int twofloor;
    private int threefloor;
    private int fourfloor;
    private int fivefloor;
}
