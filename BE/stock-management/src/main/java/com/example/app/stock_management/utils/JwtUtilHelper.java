package com.example.app.stock_management.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;


@Component
public class JwtUtilHelper {

    @Value("${jwt_privateKey}")
    private String privateKey;

    public String generateToken(String email,String id,String username,String role,boolean active) {
        SecretKey key =Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
        String jwt = Jwts.builder().
                setSubject(email)// Dữ liệu cần lưu trong token (ví dụ username hoặc userId)
                .claim("id", id)
                .claim("username", username)
                .claim("role", role)
                .claim("active", active).
                signWith(key).// Ký token bằng key đã tạo
                compact();// Tạo token dưới dạng chuỗi
        return jwt;
    }
    //Giải mã token
    public boolean verifyToken(String token) {
        try {
            SecretKey key =Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
