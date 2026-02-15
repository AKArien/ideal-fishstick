import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {Card} from "../components/cards"
import {turf_sched, an_series_sched, an_open_sched, x_sched} from "../services/splat3"


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
		<FlatList
			data={sections}
			renderItem={({item}) => {
				const Icon = item.img
				return (
					<Card
						text={item.entry}
						img={item.img}
						is_svg={true}
						goto={item.goto}
						gotoArg={item.gotoArg}
						backgroundColor={item.backgroundColor}
						navigation={navigation}
					/>
				)
			}}
			keyExtractor={(item, index) => index.toString()}
		/>
	)
}
