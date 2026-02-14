import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native'

import {Card} from "../components/cards"
import {turf_sched, an_series_sched, an_open_sched, x_sched} from "../services/splat3"

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
		gotoArg: {
			get_sched_fn: an_series_sched
		},
		img: "",
	},
	{
		entry: "Anarchy open",
		goto: "schedules",
		gotoArg: {
			get_sched_fn: an_open_sched
		},
		img: "",
	},
	{
		entry: "X battles",
		goto: "schedules",
		gotoArg: {
			get_sched_fn: x_sched
		},
		img: "",
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
					navigation={navigation}
				/>
			}
			keyExtractor={(item, index) => index.toString()}
		/>
	)
}
