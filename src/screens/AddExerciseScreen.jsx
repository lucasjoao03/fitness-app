import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import ExerciseForm from "../components/ExerciseForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddExerciseScreen = ({ navigation }) => {
  const handleSaveExercise = async (exerciseData) => {
    try {
      const exercises = await AsyncStorage.getItem("@exercises");
      const parsedExercises = exercises ? JSON.parse(exercises) : [];
      parsedExercises.push(exerciseData);
      await AsyncStorage.setItem("@exercises", JSON.stringify(parsedExercises));
      Alert.alert("Sucesso", "Exercício salvo!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o exercício.");
    }
  };

  return (
    <View style={styles.container}>
      <ExerciseForm onSave={handleSaveExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default AddExerciseScreen;
