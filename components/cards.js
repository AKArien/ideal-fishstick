import { useState, useEffect, useRef } from "react"
import { StyleSheet, Pressable, Image, ImageBackground, Animated } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { SplatoonText } from "./splatoon-text"

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export const Card = ({child, text, img, is_svg, goto, gotoArg, navigation, backgroundColor = '#b5b7b2'} ) => {
	const [targetRotation] = useState((Math.random() - 0.5) * 6)
	const rotationAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		setTimeout(() => {
			Animated.spring(rotationAnim, {
				toValue: targetRotation,
				useNativeDriver: true,
				friction: 10,
				tension: 60
			}).start()
		}, 300)
	})

	return (
		<Pressable onPress={() => {if (navigation){ navigation.navigate(goto, gotoArg)}}}>
			<AnimatedImageBackground
				source={require('../assets/tapes-transparent.png')}
				style={[styles.card, { backgroundColor, transform: [{ rotate: rotationAnim.interpolate({
					inputRange: [-180, 180],
					outputRange: ['-180deg', '180deg']
				}) }] }]}
				imageStyle={styles.backgroundImage}
			>
				<SplatoonText style={styles.overlayText}>
					{text}
				</SplatoonText>
				{child ? child : (
					is_svg ? (
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
					)
				)}
			</AnimatedImageBackground>
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