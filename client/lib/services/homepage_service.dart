// homepage_service.dart
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/homepage_model.dart';

class HomepageService {
  static const String baseUrl = "http://localhost:3000/api"; // Backend URL

  static Future<HomepageData?> getHomepageData() async {
    final url = Uri.parse('$baseUrl/homepage');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return HomepageData.fromJson(data);
    } else {
      // Hata durumunu ele al
      if (kDebugMode) {
        print("Error fetching homepage data: ${response.body}");
      }
      return null;
    }
  }
}
