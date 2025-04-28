import 'package:flutter/material.dart';
import '../services/homepage_service.dart';
import '../models/homepage_model.dart';
import '../widgets/product_section.dart';
import '../widgets/category_chip.dart';
import '../widgets/searchbar.dart' as custom; // SearchBar import
import '../widgets/appbar_menu.dart'; // AppBarMenu import

class HomepageScreen extends StatefulWidget {
  const HomepageScreen({super.key});

  @override
  HomepageScreenState createState() => HomepageScreenState();
}

class HomepageScreenState extends State<HomepageScreen> {
  late Future<HomepageData?> _homepageData;

  @override
  void initState() {
    super.initState();
    _homepageData = HomepageService.getHomepageData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            // Search bar widget
            Expanded(child: custom.SearchBar()),
            // App bar menu widget (dropdown)
            AppBarMenu(),
          ],
        ),
        backgroundColor: Colors.deepPurple,
      ),
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.deepPurple),
              child: Text("Sidebar"),
            ),
            ListTile(
              title: Text("Item 1"),
              onTap: () {
                // Handle item tap
              },
            ),
            ListTile(
              title: Text("Item 2"),
              onTap: () {
                // Handle item tap
              },
            ),
            // Add more items here
          ],
        ),
      ),
      body: FutureBuilder<HomepageData?>(
        future: _homepageData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text("Veri yüklenemedi: ${snapshot.error}"));
          } else if (!snapshot.hasData) {
            return Center(child: Text("Veri bulunamadı"));
          } else {
            final homepageData = snapshot.data!;
            return ListView(
              children: [
                ProductSection(
                  title: "En Son Eklenen Ürünler",
                  products: homepageData.latestProducts,
                ),
                ProductSection(
                  title: "Popüler Ürünler",
                  products: homepageData.popularProducts,
                ),
                _buildCategories(homepageData.categories),
              ],
            );
          }
        },
      ),
    );
  }

  Widget _buildCategories(List<Category> categories) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Kategoriler",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 4,
            children:
                categories
                    .map((category) => CategoryChip(category: category))
                    .toList(),
          ),
        ],
      ),
    );
  }
}
