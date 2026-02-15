import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {Card} from "./cards"

export const Schedule = ({sched, matchSettingName, navigation}) => {


	const RenderStage = ({stage}) => {
		return (
			<Card
				text={stage.name}
				img={stage.image.url}
				goto={"map-detail"}
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
