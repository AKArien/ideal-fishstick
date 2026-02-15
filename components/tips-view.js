import { useState, useEffect } from "react"
import { ActivityIndicator, Text, FlatList, Image, View, StyleSheet, TextInput, Button, Pressable } from "react-native"

import { getWeapons, updateTip, deleteTip, getTipsFiltered } from "../services/firebase"
import { WeaponPicker } from "./weapon-picker"

const Tip = ({item, weapons}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editText, setEditText] = useState(item.content)
	const [editWeapon, setEditWeapon] = useState(item.weapon?.id || null)

	const weaponId = item.weapon?.id
	const weapon = weaponId ? weapons[weaponId] : null

	const startEdit = () => {
		setIsEditing(true)
		setEditText(item.content)
		setEditWeapon(item.weapon?.id || null)
	}

	const cancelEdit = () => {
		setIsEditing(false)
		setEditText(item.content)
		setEditWeapon(item.weapon?.id || null)
	}

	const saveEdit = () => {
		updateTip({
			id: item.id,
			content: editText,
			weapon: editWeapon
		})
		setIsEditing(false)
	}

	const handleDelete = () => {
		deleteTip(item)
	}

	if (isEditing) {
		return (
			<View style={styles.tipContainer}>
				<TextInput
					value={editText}
					onChangeText={setEditText}
					multiline
					style={styles.editInput}
				/>
				<WeaponPicker 
					selectedWeapon={editWeapon}
					onWeaponSelect={setEditWeapon}
				/>
				<View style={styles.buttonRow}>
					<Button title="Save" onPress={saveEdit} />
					<Button title="Cancel" onPress={cancelEdit} />
				</View>
			</View>
		)
	}

	return (
		<View style={styles.tipContainer}>
			<Text>{item.content}</Text>
			{weapon && (
				<View style={styles.weaponInfo}>
					<Image 
						style={styles.weaponIcon}
						source={{ uri: weapon.img_url }}
					/>
					<Text style={styles.weaponName}>{weapon.name}</Text>
				</View>
			)}
			<View style={styles.buttonRow}>
				<Button title="Edit" onPress={startEdit} />
				<Button title="Delete" onPress={handleDelete} />
			</View>
		</View>
	)
}

export const TipsView = ({forId}) => {
	const [tips, setTips] = useState(null)
	const [weapons, setWeapons] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		getTipsFiltered(forId, (fetchedTips) => {
			try {
				setTips(fetchedTips)
				setLoading(false)
			}
			catch (err) {
				setLoading(false)
				setError(err)
			}
		})

		getWeapons((fetchedWeapons) => {
			const weaponsMap = {}
			fetchedWeapons.forEach(weapon => {
				weaponsMap[weapon.id] = weapon
			})
			setWeapons(weaponsMap)
		})
	}, [forId])

	return (loading ? <ActivityIndicator/> : error ? <Text>{error.toString()}</Text> :
		<FlatList
			data={tips}
			renderItem={({item}) => <Tip item={item} weapons={weapons} />}
			keyExtractor={(item) => item.id}
		/>
	)
}

const styles = StyleSheet.create({
	tipContainer: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	weaponInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
	},
	weaponIcon: {
		width: 30,
		height: 30,
		marginRight: 5,
	},
	weaponName: {
		fontSize: 12,
		color: '#666',
	},
	editInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 5,
		marginBottom: 10,
		minHeight: 60,
	},
	buttonRow: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 10,
	},
})