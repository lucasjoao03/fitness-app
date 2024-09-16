import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const ActivityDetailScreen = () => {
  const [exercises, setExercises] = useState([]);
  const goalDuration = 40;

  useEffect(() => {
    const fetchExercises = async () => {
      const savedExercises = await AsyncStorage.getItem("@exercises");
      setExercises(savedExercises ? JSON.parse(savedExercises) : []);
    };
    fetchExercises();
  }, []);

  const calculateAverageDuration = () => {
    const totalDuration = exercises.reduce(
      (sum, ex) => sum + parseInt(ex.duration),
      0
    );
    return exercises.length > 0
      ? (totalDuration / exercises.length).toFixed(1)
      : 0;
  };

  const chartData = {
    labels: exercises.map((ex) =>
      new Date(ex.date).toLocaleDateString("pt-BR")
    ),
    datasets: [
      {
        data: exercises.map((ex) => parseInt(ex.duration)),
        color: () => "#3b82f6",
      },
      {
        data: Array(exercises.length).fill(goalDuration),
        color: () => "#f44336",
      },
    ],
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
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseText}>
        {new Date(item.date).toLocaleDateString("pt-BR")}: {item.exercise} -{" "}
        {item.duration} min
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso das Atividades</Text>

      {exercises.length > 0 ? (
        <>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              bezier
            />
            <Text style={styles.averageText}>
              Média de Duração: {calculateAverageDuration()} min
            </Text>
            <Text style={styles.goalText}>Meta diária: {goalDuration} min</Text>
          </View>

          <Text style={styles.listTitle}>Atividades Recentes</Text>
          <FlatList
            data={exercises}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderExerciseItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
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
  averageText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  goalText: {
    marginTop: 5,
    fontSize: 16,
    color: "#f44336", // Cor da linha de meta
  },
  listTitle: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  exerciseItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  exerciseText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ActivityDetailScreen;
