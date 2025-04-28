import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/home_screen.dart'; // Ana Sayfa Ekranı (HomeScreen yerine HomepageScreen kullanıyoruz)
// Token kontrolü yapacak servis

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Auth Example',
      theme: ThemeData(primarySwatch: Colors.blue),
      // Uygulama açıldığında yapılacak yönlendirme
      initialRoute: '/login', // Ana sayfayı açacak şekilde değiştirdik
      routes: {
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/home': (context) => HomepageScreen(), // Ana Sayfa yönlendirmesi
      },
    );
  }
}
