import { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import {Card} from "../components/cards"
import {NewTip} from "../components/new-tip"
import {TipsView} from "../components/tips-view"
import {WeaponPicker} from "../components/weapon-picker"

export const MapDetail = ({navigation, route}) => {
	const { id, name, img } = route.params
	const [filterWeapon, setFilterWeapon] = useState(null)

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			<Card
				text={name}
				img={img}
			/>
			<View style={styles.section}>
				<NewTip
					forId={id}
				/>
			</View>
			<View style={styles.section}>
				<WeaponPicker
					selectedWeapon={filterWeapon}
					onWeaponSelect={setFilterWeapon}
				/>
			</View>
			<View style={styles.tipsSection}>
				<TipsView
					forId={id}
					filterWeapon={filterWeapon}
				/>
			</View>
		</ScrollView>
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
	}
})