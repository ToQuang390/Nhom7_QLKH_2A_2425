package com.example.app.stock_management.service;

public interface EmailService {
    public void sendMessage(String to, String subject, String text);
}
