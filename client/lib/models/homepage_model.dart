// homepage_model.dart
class Product {
  final int id;
  final String name;
  final double price;
  final String description;
  final int stockQuantity;
  final String imageUrl;

  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.description,
    required this.stockQuantity,
    required this.imageUrl,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] ?? 0,
      name: json['name'] ?? 'No name',
      price: (json['price'] ?? 0.0).toDouble(),
      description: json['description'] ?? 'No description',
      stockQuantity: json['stockQuantity'] ?? 0,
      imageUrl: json['imageUrl'] ?? '', // Default empty if no URL
    );
  }
}

class Category {
  final int id;
  final String name;

  Category({required this.id, required this.name});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(id: json['id'] ?? 0, name: json['name'] ?? 'No name');
  }
}

class HomepageData {
  final List<Product> latestProducts;
  final List<Product> popularProducts;
  final List<Category> categories;

  HomepageData({
    required this.latestProducts,
    required this.popularProducts,
    required this.categories,
  });

  factory HomepageData.fromJson(Map<String, dynamic> json) {
    var latestProductsList =
        (json['latestProducts'] as List?)
            ?.map((item) => Product.fromJson(item))
            .toList() ??
        [];

    var popularProductsList =
        (json['popularProducts'] as List?)
            ?.map((item) => Product.fromJson(item))
            .toList() ??
        [];

    var categoriesList =
        (json['categories'] as List?)
            ?.map((item) => Category.fromJson(item))
            .toList() ??
        [];

    return HomepageData(
      latestProducts: latestProductsList,
      popularProducts: popularProductsList,
      categories: categoriesList,
    );
  }
}
