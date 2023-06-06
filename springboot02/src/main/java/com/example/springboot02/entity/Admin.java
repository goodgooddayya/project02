package com.example.springboot02.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("admin")//表名
public class Admin {//表名要与类名一致，大小写能自行转换

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String name;
    private String sex;
    private String phone;
    private String email;
    private String username;
    private String password;
    private String photo;

}
