// components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navBarStyles } from "./styles/NavBar.styles";

const NavBar: React.FC = () => {
  return (
    <View style={navBarStyles.container}>
      <Text style={navBarStyles.title}> Home</Text>
      <View style={navBarStyles.rightIcons}>
        {/* Example of an icon */}
        <TouchableOpacity style={navBarStyles.iconContainer}>
          {/* Icon component */}
        </TouchableOpacity>
        <View style={navBarStyles.profileCircle}>
          <Text style={navBarStyles.profileText}>A</Text>
        </View>
      </View>
    </View>
  );
};

export default NavBar;