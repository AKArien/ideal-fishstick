import { useState, useEffect } from 'react'
import { ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native'

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
				goto={"Map detail"}
				gotoArg={{
                    id: item.id,
                    name: item.name,
                    img:item.img_url
                }}
				navigation={navigation}
			/>
		)
	}

	return (loading ? <ActivityIndicator /> : error ? <Text>{error.toString()}</Text> :
		<FlatList
			data={maps}
			renderItem={renderMap}
			keyExtractor={(item) => item.id}
		/>
	)
}