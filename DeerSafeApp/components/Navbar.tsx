// components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navBarStyles } from "./styles/NavBar.styles";

const NavBar: React.FC = () => {
  return (
    <View style={navBarStyles.container}>
      <Text style={navBarStyles.title}>Home</Text>
      <View style={navBarStyles.rightIcons}>
        <TouchableOpacity style={navBarStyles.iconContainer}>
          {/* Example Icon component can be added here */}
          <Text>Icon</Text>
        </TouchableOpacity>
        <View style={navBarStyles.profileCircle}>
          <Text style={navBarStyles.profileText}>A</Text>
        </View>
      </View>
    </View>
  );
};

export default NavBar;
