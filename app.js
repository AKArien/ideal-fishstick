import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { home } from "./screens/home.js"
import { rotations } from "./screens/rotations.js"

const Stack = createNativeStackNavigator()

export default function app(){
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={home} />
				<Stack.Screen name="rotations" component={rotations} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
