import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { Home } from "./screens/home.js"
import { Modes } from "./screens/modes.js"
import { ScheduleTurf } from "./screens/schedules-turf.js"
import { ScheduleSeries } from "./screens/schedules-series.js"
import { ScheduleOpen } from "./screens/schedules-open.js"
import { ScheduleX } from "./screens/schedules-x.js"
import { MapDetail } from "./screens/map-detail.js"
import { MapsList } from "./screens/map-lists.js"

const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync()

import {DefaultTheme } from "@react-navigation/native"

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
		card: 'transparent',
	},
}

export default function app(){
	const [fontsLoaded] = useFonts({
		'Splatoon': require('./assets/fonts/Splatoon1.otf'),
	})

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	return (
		<ImageBackground 
			source={require('./assets/background.jpg')} 
			style={styles.backgroundImage}
			resizeMode="cover"
		>
			<NavigationContainer theme={theme}>
				<Stack.Navigator
					screenOptions={{
						headerTitleStyle: {
							fontFamily: 'Splatoon',
							color: "white",
						},
						detachInactiveScreens: true,
						headerTransparent: false,
						headerStyle: {
							backgroundColor: 'transparent',
						},
					}}
					options={{ headerTintColor: "#fff"}}
				>
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
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
})