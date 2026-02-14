import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {schedules_all} from "../services/splat3"

export const Modes = ({navigation, route}) => {
	const [modes, setModes] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function get(){
			try {
				setModes(await schedules_all())
				setLoading(false)
			}
			catch (error){
				setLoading(false)
				setError(error)
			}
		}
		get()
	}, [])

	return (loading ? <ActivityIndicator/> : error ? <Text>{String(error)}</Text> :
		<FlatList
			data={rotations}
			renderItem={(section) =>
				<Card
					text={section.entry}
					img={section.img}
					goto={section.goto}
					navigation={navigation}
				/>
			}
			keyExtractor={(item, index) => index.toString()}
		/>
	)
}
