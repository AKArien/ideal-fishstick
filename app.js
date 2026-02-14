import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/home.js"
import { Modes } from "./screens/modes.js"

const Stack = createNativeStackNavigator()

export default function app(){
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="modes" component={Modes} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
