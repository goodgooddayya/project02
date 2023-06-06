package com.example.springboot02.controller;

import com.example.springboot02.entity.Notice;
import com.example.springboot02.service.NoticeService;
import com.example.springboot02.service.NoticeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/getAllNotices")
    public List<Notice> getAllNotices(){
        return noticeService.getAllNotices();
    }

    @GetMapping("/getNotice/{title}")
    @Operation(summary = "模糊标题查询")
    public List<Notice> getNotice(@PathVariable("title") String title){
        return noticeService.getNotice(title);
    }

    @PostMapping("/addNotice")
    public int addNotice(@RequestBody Notice notice){
        return noticeService.addNotice(notice);
    }

    @DeleteMapping("/delNotice/{id}")
    public int delNotice(@PathVariable("id") int id){
        return noticeService.delNotice(id);
    }

    @PutMapping("/updateNotice/{id}")
    public int updateNotice(@PathVariable("id")int id,@RequestBody Notice notice){

        return noticeService.updateNotice(id,notice);
    }

    /**
     *
     * @param id
     * @return 返回1得到可视性
     */
    @GetMapping("/showNotice")
    public int showNotice(@PathVariable("id") int id){
        return noticeService.showNotice(id);
    }



}
