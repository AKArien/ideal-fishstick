import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {Card} from "../components/cards"
import {turf_sched, an_series_sched, an_open_sched, x_sched} from "../services/splat3"

import TurfIcon from "../assets/turf-war.svg"
import AnarchyIcon from "../assets/anarchy.svg"
import XIcon from "../assets/x-battles.svg"

const sections = [
	{
		entry: "Turf war",
		goto: "Turf War schedules",
		img: <TurfIcon width={50} height={50} fill="#fff" />,
		backgroundColor: "#00FF00"
	},
	{
		entry: "Anarchy series",
		goto: "Anarchy Series schedules",
		img: <AnarchyIcon width={50} height={50} fill="#fff" />,
		backgroundColor: "#c9421c"
	},
	{
		entry: "Anarchy open",
		goto: "Anarchy Open schedules",
		img: <AnarchyIcon width={50} height={50} fill="#fff" />,
		backgroundColor: "#c9421c"

	},
	{
		entry: "X battles",
		goto: "X Battles schedules",
		img: <XIcon width={50} height={50} fill="#fff" />,
		backgroundColor: "#0ad1b3"

	},
]

export const Modes = ({navigation, route}) => {

	return (
		<FlatList
			data={sections}
			renderItem={({item}) =>
				<Card
					text={item.entry}
					img={item.img}
					goto={item.goto}
					gotoArg={item.gotoArg}
					backgroundColor={item.backgroundColor}
					navigation={navigation}
				/>
			}
			keyExtractor={(item, index) => index.toString()}
		/>
	)
}
