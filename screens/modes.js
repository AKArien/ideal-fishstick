import { StyleSheet, ImageBackground, FlatList } from 'react-native'

import {Card} from "../components/cards"

const sections = [
	{
		entry: "Turf war",
		goto: "Turf War schedules",
		img: "https://splatoon3.ink/assets/regular.64299513.svg",
		backgroundColor: "#00FF00"
	},
	{
		entry: "Anarchy series",
		goto: "Anarchy Series schedules",
		img: "https://splatoon3.ink/assets/bankara.996009b0.svg",
		backgroundColor: "#c9421c"
	},
	{
		entry: "Anarchy open",
		goto: "Anarchy Open schedules",
		img: "https://splatoon3.ink/assets/bankara.996009b0.svg",
		backgroundColor: "#c9421c"

	},
	{
		entry: "X battles",
		goto: "X Battles schedules",
		img: "https://splatoon3.ink/assets/x.4bec815d.svg",
		backgroundColor: "#0ad1b3"

	},
]

export const Modes = ({navigation, route}) => {

	return (
		<ImageBackground 
			source={require('../assets/background.jpg')} 
			style={styles.backgroundImage}
			resizeMode="cover"
		>
			<FlatList
				data={sections}
				renderItem={({item}) => {
					const Icon = item.img
					return (
						<Card
							text={item.entry}
							img={item.img}
							is_svg={true}
							onPress={() => {navigation.navigate(item.goto)}}
							backgroundColor={item.backgroundColor}
						/>
					)
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
})