import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const AddExerciseScreen = ({ navigation }) => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");

  const handleSaveExercise = async () => {
    try {
      if (!exercise || !duration) {
        Alert.alert("Erro", "Preencha todos os campos.");
        return;
      }

      const newExercise = {
        exercise,
        duration,
        date: new Date().toISOString(),
      };
      const exercises = await AsyncStorage.getItem("@exercises");
      const parsedExercises = exercises ? JSON.parse(exercises) : [];
      parsedExercises.push(newExercise);
      await AsyncStorage.setItem("@exercises", JSON.stringify(parsedExercises));

      Alert.alert("Sucesso", "Exercício salvo!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o exercício.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Novo Exercício</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Tipo de Exercício:</Text>
        <TextInput
          style={styles.input}
          value={exercise}
          onChangeText={setExercise}
          placeholder="Corrida, caminhada, etc."
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Duração (min):</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="Ex: 30"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSaveExercise}
        >
          <FontAwesome name="check" size={20} color="white" />
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="times" size={20} color="white" />
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#4caf50",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AddExerciseScreen;
