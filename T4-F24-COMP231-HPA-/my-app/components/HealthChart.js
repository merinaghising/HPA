import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const HealthChart = ({ healthData }) => {
  const screenWidth = Dimensions.get('window').width;

  if (!healthData || healthData.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No health data available</Text>;
  }

  const labels = healthData.map((data, index) => {
    const date = new Date(data.date);
    return index % Math.ceil(healthData.length / 5) === 0
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';
  });

  const bloodPressureData = healthData.map(data => data.bloodPressure || 0);
  const glucoseLevelData = healthData.map(data => data.glucoseLevel || 0);

  const data = {
    labels,
    datasets: [
      {
        data: bloodPressureData,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: glucoseLevelData,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Blood Pressure', 'Glucose Level'],
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>Health Metrics Over Time</Text>
      <LineChart
        data={data}
        width={Math.min(screenWidth - 40, 400)}
        height={220}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#222',
          backgroundGradientTo: '#444',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
};

export default HealthChart;
