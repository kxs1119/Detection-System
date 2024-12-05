import { StyleSheet } from 'react-native';

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50, // Define height for the map container
    width: '100%',
    backgroundColor: '#1A1A1A', 
    marginTop: 25, 
  },
  map: {
    flex: 1, // Ensures the map stretches to fill the container
  },
});

export default mapStyles;
