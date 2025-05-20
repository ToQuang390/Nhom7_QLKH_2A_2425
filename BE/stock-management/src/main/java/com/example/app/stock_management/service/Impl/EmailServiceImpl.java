package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;


    @Override
    public void sendMessage(String to, String subject, String text) {
        //MimeMailMessage =>có đính kèm media


        //SimpleMailMessage =>gửi nội dung thông thường
        //SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage message =mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true);

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text,true);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


        //thưc hiện hành đông gửi email
        mailSender.send(message);
    }
}
