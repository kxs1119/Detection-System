// components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';

const Navbar: React.FC = () => (
  <View style={styles.navbar}>
    <TouchableOpacity style={styles.iconContainer}>
      <Icon name="person" size={24} color="#CCCCCC" />
    </TouchableOpacity>
    <Text style={styles.title}>Home</Text>
    <View style={styles.rightIcons}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="notifications" size={24} color="#CCCCCC" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="settings" size={24} color="#CCCCCC" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileCircle}>
        <Text style={styles.profileText}>K</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Navbar;