package com.example.springboot02.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springboot02.entity.Notice;
import com.example.springboot02.mapper.NoticeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService{
    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public List<Notice> getAllNotices(){
        return noticeMapper.selectList(null);
    }
    @Override
    public int addNotice(Notice notice){
        return noticeMapper.insert(notice);//返回结果大于0即添加成功 否则返回失败
    }
    @Override
    public int delNotice(int id){
        if(noticeMapper.selectById(id)!=null){
            return noticeMapper.deleteById(id);
        }
        else
            return 0;
    }
    @Override
    public List<Notice> getNotice(String title){
        QueryWrapper<Notice> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("title",title);
        return noticeMapper.selectList(queryWrapper);
    }
    @Override
    public int updateNotice(int id, Notice notice){
        if(noticeMapper.selectById(id)!=null){
            return noticeMapper.updateById(notice);
        }
        else
            return 0;
    }

    @Override
    public int showNotice(int id) {
        Notice notice=noticeMapper.selectById(id);
        if (notice!=null){
            notice.setState(1);
            return 1;
        }
        else return 0;
    }

}
