import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import {Card} from "../components/cards"
import { SplatoonText } from '../components/splatoon-text'

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
			<SplatoonText styles={styles.title}>
				Welcome to Splatip ! A platform to share tips on upcoming splatoon rotations.
				See also the permanent map index, to look up a map that is not planned for rotation soon.
				Get good, and have fun !
			</SplatoonText>
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
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		marginVertical: 8,
		color: "white"
	},
});
