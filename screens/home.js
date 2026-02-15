import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ImageBackground, Image, FlatList } from 'react-native'

import {Card} from "../components/cards"
import { SplatoonText } from '../components/splatoon-text'

const sections = [
	{
		entry: "View by modes",
		goto: "Modes",
		img: require("../assets/battle-icons.png"),
		style: {width: '80%', height: '100%'},
		resizeMode: "contain",
	},
	{
		entry: "View by map",
		goto: "Map list",
		img: require("../assets/any-map.png"),
		style: {width: '100%', height: '100%'},
		resizeMode: "fill",
	}
]

export const Home = ({navigation, route}) => {
	return (
		<>
			<ImageBackground 
					source={require('../assets/background.jpg')} 
					style={styles.backgroundImage}
					resizeMode="cover"
				>
			<View style={styles.title}>
				<SplatoonText style={styles.title}>
					Welcome to Splatip ! A platform to share tips on upcoming splatoon rotations.
					See also the permanent map index, to look up a map that is not planned for rotation soon.
					Get good, and have fun !
				</SplatoonText>
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
						child={<Image source={item.img} style={item.style} resizeMode={item.resizeMode}/>}
						backgroundColor={item.backgroundColor}
						navigation={navigation}
					/>
				}
				keyExtractor={(item) => item.goto}
			/></ImageBackground>
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
		color: "white",
		fontSize: 18,
	},
});
