// NavBar.styles.ts
import { StyleSheet } from 'react-native';

export const navBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1A1A1A', // Dark background color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E53935', // Red background color
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  profileText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
  },
});
