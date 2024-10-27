import 'package:flutter/material.dart';
import 'screens/MapScreen.dart';
import 'models/AlertLocation.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_map/flutter_map.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DeerSafe',
      theme: ThemeData.dark(),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
<<<<<<< HEAD
  const HomeScreen({super.key});
=======
  const HomeScreen({Key? key}) : super(key: key);
>>>>>>> eb6a8150 (Adding Home screen in flutter)

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
      child: const Text(
        'Recent Alerts',
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Sample alert data
    List<AlertLocation> alertLocations = [
      AlertLocation(
        id: '1',
        location: 'Park',
        time: '9:30 AM',
        position: LatLng(37.7749, -122.4194),
      ),
      AlertLocation(
        id: '2',
        location: 'Highway',
        time: '10:00 AM',
        position: LatLng(37.7849, -122.4294),
      ),
      AlertLocation(
        id: '3',
        location: 'Forest',
        time: '11:15 AM',
        position: LatLng(37.7949, -122.4394),
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        leading: const Icon(Icons.person),
        title: const Text('Home', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {},
          ),
          CircleAvatar(
            backgroundColor: Colors.red,
            child: const Text('K', style: TextStyle(color: Colors.white)),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            const SizedBox(height: 10),
            SizedBox(
              height: 120,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: alertLocations.map((alert) => _buildAlertItem(
                    imageUrl: 'https://via.placeholder.com/100',
                    location: alert.location,
                    time: alert.time,
                  )).toList(),
                ),
              ),
            ),
            const SizedBox(height: 20),
            // Embedded map section
            const Text(
              'Current Location',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
<<<<<<< HEAD
            SizedBox(
=======
            Container(
>>>>>>> eb6a8150 (Adding Home screen in flutter)
              height: 200, // Adjust height as needed
              child: FlutterMap(
                options: MapOptions(
                  center: LatLng(37.7749, -122.4194), // Center location
                  zoom: 13,
                ),
                children: [
                  TileLayer(
                    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    subdomains: ['a', 'b', 'c'],
                  ),
                  MarkerLayer(
                    markers: alertLocations.map((alert) {
                      return Marker(
                        width: 80,
                        height: 80,
                        point: alert.position,
                        builder: (ctx) => Icon(
                          Icons.location_on,
                          color: Colors.red,
                          size: 30,
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
            const Spacer(),
            Center(
              child: Container(
                width: 100,
                height: 5,
                color: Colors.grey[700],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAlertItem({required String imageUrl, required String location, required String time}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(
            radius: 30,
            backgroundImage: NetworkImage(imageUrl),
          ),
          const SizedBox(height: 4),
          Text(
            location,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
          Text(
            time,
            style: const TextStyle(fontSize: 12, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
