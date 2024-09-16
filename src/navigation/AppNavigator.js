import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddExerciseScreen from "../screens/AddExerciseScreen";
import ActivityDetailScreen from "../screens/ActivityDetailScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Resumo de Atividades" }}
        />
        <Stack.Screen
          name="AddExercise"
          component={AddExerciseScreen}
          options={{ title: "Registrar Novo Exercício" }}
        />
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetailScreen}
          options={{ title: "Detalhes das Atividades" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
