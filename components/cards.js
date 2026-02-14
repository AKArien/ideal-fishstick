import { StyleSheet, Text, Pressable, Image } from 'react-native'

export const Card = ({text, img, goto, navigation} ) => {

	return (
		<Pressable onPress={navigation.navigate(goto, {})}>
			<Image
				style={styles.image}
				source={{uri: img}}
			/>
			<Text>
				{text}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	image: {
	}
});
