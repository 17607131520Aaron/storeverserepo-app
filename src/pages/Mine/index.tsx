import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Mine: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Mine</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Mine;
