import { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native'

import { ensureMap } from "../services/firebase"

import {Card} from "./cards"

export const Schedule = ({sched, matchSettingName, navigation}) => {

	const RenderStage = ({stage}) => {
		
		// for convenience in development : see comment in firebase.js
		ensureMap(stage)

		return (
			<Card
				text={stage.name}
				img={stage.image.url}
				goto={"Map detail"}
				gotoArg={{
					id: stage.vsStageId,
					name: stage.name,
					img: stage.image.url
				}}
				navigation={navigation}
			/>
		)
	}

	const formatTime = (isoString) => {
		const date = new Date(isoString)
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
	}

	const render_section = ({item}) => {
		return (
			<>
				<Text style={styles.timeText}>{formatTime(item.startTime)}</Text>
				<RenderStage stage={item[matchSettingName].vsStages["0"]} />
				<RenderStage stage={item[matchSettingName].vsStages["1"]} />
			</>
		)
	}

	return (
		<>
			<FlatList
				data={sched}
				renderItem={render_section}
				keyExtractor={(item, index) => index.toString()}
			/>
		</>
	)

}

const styles = StyleSheet.create({
	timeText: {
		color: 'white',
		fontFamily: 'Splatoon',
		fontSize: 16,
		marginVertical: 8,
	}
})