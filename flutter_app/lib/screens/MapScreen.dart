import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../models/AlertLocation.dart';

class MapScreen extends StatelessWidget {
  final List<AlertLocation> alertLocations;

  const MapScreen({super.key, required this.alertLocations});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Alert Map')),
      body: FlutterMap(
        options: MapOptions(
          center: LatLng(37.7749, -122.4194), // Set initial map center (e.g., example coordinates)
          zoom: 10,
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
                builder: (ctx) => Column(
                  children: [
                    Icon(
                      Icons.location_on,
                      color: Colors.red,
                      size: 30,
                    ),
                    Text(
                      alert.location,
                      style: const TextStyle(color: Colors.white, fontSize: 12),
                    ),
                    Text(
                      alert.time,
                      style: const TextStyle(color: Colors.white, fontSize: 10),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
