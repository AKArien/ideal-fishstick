
export default function generic_schedule({navigate, nodes, render}){

	const render_stage = ({stage} => {
		return (
			<Pressable onPress={navigation.navigate(stage)}>
				<Image
					style = {styles.mapArt}
					source = {stage.image.url}
				/>
				<Text>
					{stage.name}
				</Text>
			</Pressable>
		)
	})

	const render_section = ({item} => {
		return (
			<>
				
				<render_stage stage={item.regularMatchSetting.vsStages."0"} />
				<render_stage stage={item.regularMatchSetting.vsStages."1"} />
			</>
	})

	return (
		<>
			<FlatList
				data = {nodes}
				renderItem={render_section}
				keyExtractor={(item, index) => item[index]}
			/>
		</>
	)

}
