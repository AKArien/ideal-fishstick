import { StyleSheet, Text, Pressable, View, ImageBackground } from 'react-native'
import { useState, useEffect } from 'react'

export const Card = ({text, img, goto, gotoArg, navigation, backgroundColor = '#00FF00'} ) => {
	const [rotation, setRotation] = useState(0)

	useEffect(() => {
		setRotation((Math.random() - 0.5) * 6)
	}, [])

	return (
	
		<Pressable onPress={() => {if (navigation){ navigation.navigate(goto, gotoArg)}}}>
			<ImageBackground
				source={require('../assets/tapes-transparent.png')}
				style={[styles.card, { backgroundColor, transform: [{ rotate: `${rotation}deg` }] }]}
				imageStyle={styles.backgroundImage}
			>
				<Text>
					{text}
				</Text>
				<View style={styles.iconContainer}>
					{img}
				</View>
			</ImageBackground>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 10,
		minHeight: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		overflow: 'hidden',
	},
	backgroundImage: {
		opacity: 0.3,
		borderRadius: 15,
	},
	iconContainer: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	}
});