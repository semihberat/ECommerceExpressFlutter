// appbar_menu.dart
import 'package:flutter/material.dart';

class AppBarMenu extends StatelessWidget {
  const AppBarMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String>(
      onSelected: (String value) {
        // Handle menu item selection
        switch (value) {
          case 'Item 1':
            // Handle Item 1 action
            break;
          case 'Item 2':
            // Handle Item 2 action
            break;
          default:
            break;
        }
      },
      itemBuilder: (BuildContext context) {
        return [
          PopupMenuItem<String>(value: 'Item 1', child: Text('Item 1')),
          PopupMenuItem<String>(value: 'Item 2', child: Text('Item 2')),
          // Add more items here if needed
        ];
      },
      icon: Icon(Icons.more_vert), // 3-dot menu icon
    );
  }
}
