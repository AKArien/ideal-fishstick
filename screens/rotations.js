import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {schedules_all} from "../services/splat3"

export const Rotations = ({navigation, route}) => {
	const [rotations, setRotations] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function get(){
			try {
				setRotations(await schedules_all())
				setLoading(false)
			}
			catch (error){
				setError(error)
			}
		}
		get()
	}, [setRotations, setLoading, setError])

	return (loading ? <ActivityIndicator/> : error ? <Text>{error}</Text> :
		<FlatList
			data={sections}
			renderItem={(section) =>
				<Card
					text={section.entry}
					img={section.img}
					goto={section.goto}
					navigation={navigation}
				/>
			}
			keyExtractor={(item, index) => item[index]}
		/>
	)
}
