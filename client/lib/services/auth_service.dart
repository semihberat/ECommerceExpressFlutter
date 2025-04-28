import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String baseUrl =
      "http://localhost:3000/api/auth"; // LOCALHOST ayarı (emülatör için)

  static Future<bool> register({
    required String name,
    required String email,
    required String password,
  }) async {
    final url = Uri.parse('$baseUrl/register');

    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"name": name, "email": email, "password": password}),
    );

    if (response.statusCode == 201) {
      return true; // Başarılı
    } else {
      // İstersen burada hata mesajı döndür
      if (kDebugMode) {
        print("Register failed: ${response.body}");
      }
      return false;
    }
  }

  static Future<String?> login({
    required String email,
    required String password,
  }) async {
    final url = Uri.parse('$baseUrl/login');

    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final token = data['token'];

      // Token'ı kaydet
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);

      return token;
    } else {
      if (kDebugMode) {
        print("Login failed: ${response.body}");
      }
      return null;
    }
  }

  static Future<bool> verifyEmail(String token) async {
    final url = Uri.parse('$baseUrl/verify-email?token=$token');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      return true;
    } else {
      if (kDebugMode) {
        print("Verify email failed: ${response.body}");
      }
      return false;
    }
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }
}
