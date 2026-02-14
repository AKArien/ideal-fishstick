import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {Card} from "../components/cards"
import {turf_sched, anarchy_sched, x_sched} from "../services/splat3"

const sections = [
	{
		entry: "Turf war",
		goto: "schedules",
		gotoArg: {
			get_sched_fn: turf_sched,

		},
		img: "",
	},
	{
		entry: "Anarchy series",
		goto: "schedules",
		gotoArg: {},
		img: "",
	},
	{
		entry: "Anarchy open",
		goto: "schedules",
		gotoArg: {},
		img: "",
	},
	{
		entry: "X battles",
		goto: "schedules",
		gotoArg: {},
		img: "",
	},
]

export const Modes = ({navigation, route}) => {

	return (
		<FlatList
			data={sections}
			renderItem={(section) =>
				<Card
					text={section.entry}
					img={section.img}
					goto={section.goto}
					gotoArg={section.gotoArg}
					navigation={navigation}
				/>
			}
			keyExtractor={(item, index) => index.toString()}
		/>
	)
}
