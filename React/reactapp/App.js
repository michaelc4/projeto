import * as React from 'react';
import UsuariosScreen from "./screens/Usuarios";
import UsuarioScreen from "./screens/Usuario";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Usuários" component={UsuariosScreen} />
        <Stack.Screen name="Usuário" component={UsuarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}