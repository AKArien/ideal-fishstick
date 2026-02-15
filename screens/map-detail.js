import { useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'

import {Card} from "../components/cards"
import {NewTip} from "../components/new-tip"
import {TipsView} from "../components/tips-view"
import {WeaponPicker} from "../components/weapon-picker"
import { SplatoonText } from '../components/splatoon-text'

export const MapDetail = ({navigation, route}) => {
	const { id, name, img } = route.params
	const [filterWeapon, setFilterWeapon] = useState(null)

	return (
		<ImageBackground 
				source={require('../assets/background.jpg')} 
				style={styles.backgroundImage}
				resizeMode="cover"
			>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				<Card
					text={name}
					img={img}
				/>
				<View style={styles.section}>
					<SplatoonText style={styles.explanationText}>
						Feel free to leave a tip here. If it is specific to your weapon, select it !
					</SplatoonText>
					<NewTip
						forId={id}
					/>
				</View>
				<SplatoonText style={styles.explanationText}>
					View below the tips left by other players
				</SplatoonText>
				<View style={[styles.section, styles.filterRow]}>
					<SplatoonText style={styles.sortText}>
						Sort tips by weapon :
					</SplatoonText>
					<View style={styles.w_p_cont}>
						<WeaponPicker
							selectedWeapon={filterWeapon}
							onWeaponSelect={setFilterWeapon}
						/>
					</View>
				</View>
				<View style={styles.tipsSection}>
					<TipsView
						forId={id}
						filterWeapon={filterWeapon}
					/>
				</View>
			</ScrollView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 20,
	},
	section: {
		marginHorizontal: 10,
		marginVertical: 8,
	},
	tipsSection: {
		flex: 1,
		marginHorizontal: 10,
		marginTop: 8,
	},
	explanationText: {
		marginLeft: "20",
		fontSize: 16,
		color: "white",
	},
	sortText: {
		fontSize: 14,
		marginLeft: 8,
		color: "#ddd",
	},
		filterRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	w_p_cont: { // i don’t like having this, but it’s the only way i found
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
})