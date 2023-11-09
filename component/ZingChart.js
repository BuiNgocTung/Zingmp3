import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, StyleSheet } from 'react-native';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Màu của đường biểu đồ
      strokeWidth: 2, // Độ rộng của đường biểu đồ
    },
  ],
};

export default function ZingChart({ navigation }) {
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={300} // Chiều rộng của biểu đồ
        height={200} // Chiều cao của biểu đồ
        yAxisSuffix="k" // Đơn vị trục y
        chartConfig={{
          backgroundGradientFrom: '#fff', // Màu nền từ
          backgroundGradientTo: '#fff', // Màu nền đến
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu chữ
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu của nhãn
          strokeWidth: 2, // Độ rộng của đường biểu đồ
        }}
        bezier // Hiệu ứng cong của đường biểu đồ
        style={styles.chart}
      />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

