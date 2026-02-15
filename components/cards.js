import { useState, useEffect } from "react"
import { StyleSheet, Pressable, Image, ImageBackground } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { SplatoonText } from "./splatoon-text"

export const Card = ({text, img, is_svg, goto, gotoArg, navigation, backgroundColor = '#b5b7b2'} ) => {
	const [rotation, setRotation] = useState(0)

	useEffect(() => {
		// Random rotation between -3 and 3 degrees
		setRotation((Math.random() - 0.5) * 6)
	}, [])

	return (
		<Pressable onPress={() => {if (navigation){ navigation.navigate(goto, gotoArg)}}}>
			<ImageBackground
				source={require('../assets/tapes-transparent.png')}
				style={[styles.card, { backgroundColor, transform: [{ rotate: `${rotation}deg` }] }]}
				imageStyle={styles.backgroundImage}
			>
				<SplatoonText style={styles.overlayText}>
					{text}
				</SplatoonText>
				{is_svg ? (
					<SvgUri
						uri={img}
						width="100%"
						height="100%"
						style={styles.image}
					/>
				) : (
					<Image
						style={styles.image}
						source={{uri: img}}
						resizeMode="cover"
					/>
				)}
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
	image: {
		width: '100%',
		height: '100%',
	},
	overlayText: {
		position: 'absolute',
		zIndex: 1,
		top: 10,
		color: 'white',
		fontSize: 20,
		textShadowColor: "black",
		textShadowOffset: { width: -1, height: -1},
		textShadowRadius: 10,
	}
});