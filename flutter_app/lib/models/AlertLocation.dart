import 'package:latlong2/latlong.dart';

class AlertLocation {
  final String id;
  final String location;
  final String time;
  final LatLng position;

  AlertLocation({
    required this.id,
    required this.location,
    required this.time,
    required this.position,
  });
}
