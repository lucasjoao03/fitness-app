import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import ProgressChart from "../components/ProgressChart";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso das Atividades</Text>
      {exercises.length > 0 ? (
        <ProgressChart data={chartData} />
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
});

export default ActivityDetailScreen;
