package com.example.springboot02.service;

import com.example.springboot02.entity.Notice;

import java.util.List;

public interface NoticeService {
    List<Notice> getAllNotices();
    int addNotice(Notice notice);
    int delNotice(int id);
    List<Notice> getNotice(String title);
    int updateNotice(int id, Notice notice);
    int showNotice(int id);

}
