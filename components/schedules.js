import { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native'

import { ensureMap } from "../services/firebase"

import {Card} from "./cards"

export const Schedule = ({sched, matchSettingName, navigation}) => {

	const RenderStage = ({stage}) => {
		
		// for convenience in development : see comment in firebase.js
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

	const render_section = ({item}) => {
		return (
			<>
				
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
