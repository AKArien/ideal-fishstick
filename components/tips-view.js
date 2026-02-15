import { useState, useEffect } from "react"
import { ActivityIndicator, Text, FlatList } from "react-native"

import {getTips} from "../services/firebase"

export const TipsView = ({forId}) => {
	// const { forId } = props
	const [tips, setTips] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		// fetch tips from firebase
		setTips(getTips(() => {
			try {
				setLoading(false)
			}
			catch {
				setLoading(false)
				setError(false)
			}
		}))
	})

	const Tip = ({item}) => {

		<Text>
			{item.content}
		</Text>
	}

	return (loading ? <ActivityIndicator/> : error ? <Text>{error.toString()}</Text> :
		<FlatList
			data={tips}
			renderItem={({item}) => <Tip item={item} />}
		/>
	)
}
