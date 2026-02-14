import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/home.js"
import { Rotations } from "./screens/rotations.js"

const Stack = createNativeStackNavigator()

export default function app(){
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="rotations" component={Rotations} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
