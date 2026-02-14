import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

export const Schedule = (sched, navigation) => {
	
	const RenderStage = ({stage}) => {
		return (
			<Card
				text={stage.name}
				img={stage.image.url}
				goto={"map-detail"}
				gotoArg={stage.vsStageId}
				navigation={navigation}
			/>
		)
	}

	const render_section = (item) => {
		return (
			<>
				
				<RenderStage stage={item["0"]} />
				<RenderStage stage={item["1"]} />
			</>
		)
	}

	return (
		<>
			<FlatList
				data = {sched}
				renderItem={render_section}
				keyExtractor={(item, index) => item[index]}
			/>
		</>
	)

}
