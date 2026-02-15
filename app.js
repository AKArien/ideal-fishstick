import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/home.js"
import { Modes } from "./screens/modes.js"
import { ScheduleTurf } from "./screens/schedules-turf.js"
import { ScheduleSeries } from "./screens/schedules-series.js"
import { ScheduleOpen } from "./screens/schedules-open.js"
import { ScheduleX } from "./screens/schedules-x.js"
import { MapDetail } from "./screens/map-detail.js"
import { MapsList } from "./screens/map-lists.js"

const Stack = createNativeStackNavigator()

export default function app(){
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Splatip" component={Home} />
				<Stack.Screen name="Modes" component={Modes} />
				<Stack.Screen name="Turf War schedules" component={ScheduleTurf} />
				<Stack.Screen name="Anarchy Series schedules" component={ScheduleSeries} />
				<Stack.Screen name="Anarchy Open schedules" component={ScheduleOpen} />
				<Stack.Screen name="X Battles schedules" component={ScheduleX} />
				<Stack.Screen name="Map detail" component={MapDetail} />
				<Stack.Screen name="Map list" component={MapsList} />				
			</Stack.Navigator>
		</NavigationContainer>
	)
}
