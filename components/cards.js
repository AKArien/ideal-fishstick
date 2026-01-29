
export default const Card = ({text, img, goto}) => {
	return (
		<Pressable onPress={navigation.navigate(section.goto)}>
			<Image
				style={}
				source={{uri: section.img}}
			/>
			<Text>
				{section.entry}
			</Text>
		</Pressable>
	)
}

