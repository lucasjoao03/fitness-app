// src/components/ProgressChart.js
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ProgressChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: "#ff9800",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  chart: {
    borderRadius: 16,
  },
});

export default ProgressChart;
