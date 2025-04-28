import 'package:flutter/material.dart';
import '../models/homepage_model.dart';

class CategoryChip extends StatelessWidget {
  final Category category;

  const CategoryChip({required this.category, super.key});

  @override
  Widget build(BuildContext context) {
    return Chip(
      label: Text(category.name),
      backgroundColor: Colors.deepPurple.shade50,
      avatar: Icon(Icons.category, size: 16, color: Colors.deepPurple),
    );
  }
}
