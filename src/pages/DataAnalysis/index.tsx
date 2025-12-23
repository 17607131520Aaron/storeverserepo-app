import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { showGlobalAlert, showAlert, showJsonAlert } from '~/components/GlobalAlert';

const DataAnalysis: React.FC = () => {
  // 测试简单文本提示框
  const handleShowTextAlert = () => {
    showAlert('这是一个简单的文本提示框', '提示');
  };

  // 测试JSON数据提示框
  const handleShowJsonAlert = () => {
    const testData = {
      successSn: null,
      failSn: [
        {
          sn: [
            'BJC999450023400/So0251205390006588',
            'ADHF-DC12V-950-1250-41092511A001398',
            'BJC997550006500/So0SPIN5110133000538',
          ],
        },
      ],
    };
    showJsonAlert(testData, 'SN校验未通过,单包结果:');
  };

  // 测试自定义提示框
  const handleShowCustomAlert = () => {
    showGlobalAlert({
      title: '自定义提示框',
      content: '这是一个自定义的提示框，可以显示各种内容',
      closable: true,
      closeText: '知道了',
      style: {
        position: 'center',
        width: '85%',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>数据统计分析</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleShowTextAlert}>
          <Text style={styles.buttonText}>显示文本提示框</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowJsonAlert}>
          <Text style={styles.buttonText}>显示JSON提示框</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowCustomAlert}>
          <Text style={styles.buttonText}>显示自定义提示框</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DataAnalysis;
