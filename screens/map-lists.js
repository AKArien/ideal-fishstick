import { useState, useEffect } from 'react'
import { ActivityIndicator, ImageBackground, Text, FlatList, StyleSheet } from 'react-native'

import { Card } from "../components/cards"
import { getMaps } from "../services/firebase"

export const MapsList = ({navigation}) => {
	const [maps, setMaps] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		getMaps((fetchedMaps) => {
			try {
				setMaps(fetchedMaps)
				setLoading(false)
			}
			catch (err) {
				setLoading(false)
				setError(err)
			}
		})
	}, [])

	const renderMap = ({item}) => {
		return (
			<Card
				text={item.name}
				img={item.img_url}
				onPress={() => {navigation.navigate("Map detail", {
					id: item.id,
					name: item.name,
					img: item.img_url
				})}}
			/>
		)
	}

	return (loading ? <ActivityIndicator /> : error ? <Text>{error.toString()}</Text> :
		<ImageBackground 
			source={require('../assets/background.jpg')} 
			style={styles.backgroundImage}
			resizeMode="cover"
		>
			<FlatList
				data={maps}
				renderItem={renderMap}
				keyExtractor={(item) => item.id}
			/>
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