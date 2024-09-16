import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const ActivityDetailScreen = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const savedExercises = await AsyncStorage.getItem("@exercises");
      setExercises(savedExercises ? JSON.parse(savedExercises) : []);
    };
    fetchExercises();
  }, []);

  const chartData = {
    labels: exercises.map((ex) => new Date(ex.date).toLocaleDateString()),
    datasets: [{ data: exercises.map((ex) => parseInt(ex.duration)) }],
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>Progresso das Atividades</Text>
      {exercises.length > 0 ? (
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>
      ) : (
        <Text>Nenhum exercício registrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  chart: {
    borderRadius: 16,
  },
});

export default ActivityDetailScreen;
