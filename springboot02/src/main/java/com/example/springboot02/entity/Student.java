package com.example.springboot02.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("students")
public class Student {

    @TableId(value = "ID")
    private String ID;
    private String name;
    private String sex;
    private String major;
    private String password;

}
