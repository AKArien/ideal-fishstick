import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const thingsToDo = [
	{
		entry: "Decide what theme this should be built around",
		done: false,
	},
	{
		entry: "Add more things here",
		done: false,
	},
	{
		entry: "Make it pretty !",
		done: false,
	},
]

export default function Home() {
	return (
		<>
		<View style={title}>
			<Text>Title card</Text>
		</View>
		<View style={styles.container}>
			<Text>Time to make an app</Text>
		</View>
		<StatusBar style="auto" />
		<FlatList
			data = {thingsToDo}
			renderItem={({item}) => <Text>{item.entry}</Text>}
			keyExtractor={item => item.entry}
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
