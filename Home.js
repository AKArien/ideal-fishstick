import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
	return (
		<View style={title}>
			<Text>Title card</Text>
		</View>
		<View style={styles.container}>
			<Text>Time to make an app</Text>
		<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	title {
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
