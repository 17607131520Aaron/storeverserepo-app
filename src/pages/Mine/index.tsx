import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Mine: React.FC = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    // navigation.navigate('Login');
    console.log({ navigation });
  };
  return (
    <View>
      <Text>Mine</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Mine;
