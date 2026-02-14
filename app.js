import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/home.js"
import { Modes } from "./screens/modes.js"
import { ScheduleTurf } from "./screens/schedules-turf.js"
import { ScheduleSeries } from "./screens/schedules-series.js"
import { ScheduleOpen } from "./screens/schedules-open.js"
import { ScheduleX } from "./screens/schedules-x.js"

const Stack = createNativeStackNavigator()

export default function app(){
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="modes" component={Modes} />
				<Stack.Screen name="schedules-turf" component={ScheduleTurf} />
				<Stack.Screen name="schedules-series" component={ScheduleSeries} />
				<Stack.Screen name="schedules-open" component={ScheduleOpen} />
				<Stack.Screen name="schedules-x" component={ScheduleX} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
