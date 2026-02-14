import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, Pressable} from 'react-native'

import {Card} from "../components/cards"

const sections = [
	{
		entry: "Rotations",
		goto: "rotations",
		img: "",
	},
	{
		entry: "View by map",
		goto: "maps",
		img: "",
	},
	{
		entry: "View by weapon",
		goto: "weapons",
		img: "",
	},
]

export const Home = ({navigation, route}) => {
	return (
		<>
			<View style={styles.title}>
				<Text>Title card</Text>
			</View>
			<View style={styles.container}>
				<Text>Time to make an app</Text>
			</View>
			<StatusBar style="auto" />
			<FlatList
				data={sections}
				renderItem={(section) =>
					<Card
						text={section.entry}
						img={section.img}
						goto={section.goto}
						navigation={navigation}
					/>
				}
				keyExtractor={(item) => item.goto}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		marginVertical: 8,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
