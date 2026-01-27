import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const stack = createNativeStackNavigator()

export default function app(){
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={home} />
				<Stack.Screen name="rotations" component={rotations} />
				<Stack.Screen name="rotation-turf" component={rotationTurf} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
