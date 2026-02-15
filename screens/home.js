import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import {Card} from "../components/cards"

const sections = [
	{
		entry: "View by modes",
		goto: "Modes",
		img: "",
	},
	{
		entry: "View by map",
		goto: "Map list",
		img: "",
	}
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
				renderItem={({item}) =>
					<Card
						text={item.entry}
						goto={item.goto}
						backgroundColor={item.backgroundColor}
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
