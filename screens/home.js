import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, Pressable} from 'react-native'

const sections = [
	{
		entry: "Rotations",
		goto: "rotations",
		img: "",
	},
	{
		entry: "Splatfests",
		goto: "splatfests",
		img: "",
	},
	{
		entry: "Gear",
		goto: "gear"
		img: "",
	},
]

export default function home({navigation, route}) {

	const render_section = (section) => {
		return (
			<Pressable onPress={navigation.navigate(section.goto)}>
				<Image

				/>
				<Text>

				</Text>
			</Pressable>
		)
	}
	
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
				data = {sections}
				renderItem={render_section}
				keyExtractor={(item, index) => item[index]}
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
