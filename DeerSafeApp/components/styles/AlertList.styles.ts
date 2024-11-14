import { StyleSheet } from 'react-native';

export const alertListStyles = StyleSheet.create({
  container: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  alertContainer: {
    alignItems: 'center',
    marginRight: 15, // Space between each alert item horizontally
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensure image fits within the circle
  },
  image: {
    width: '100%',
    height: '100%',
  },
  timeText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
    textAlign: 'center', // Center-align the text below each circle
  },
});
