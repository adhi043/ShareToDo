import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Slider from '../Pages/Slider'
import HomeScreen from '../Pages/HomeScreen'
import AddTaskScreen from '../Pages/AddTaskScreen'





const StackNavigator = () => {

  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer independent={true}>

      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName={'Slider'}>
        <Stack.Screen name='Slider' component={Slider} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: false }} />        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
