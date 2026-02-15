import { useState, useEffect } from "react"
import { ActivityIndicator, Text, FlatList, Image, View, StyleSheet, TextInput, Button, Pressable } from "react-native"

import { getWeapons, updateTip, deleteTip, getTipsFiltered } from "../services/firebase"
import { WeaponPicker } from "./weapon-picker"

export const TipsView = ({forId}) => {
	const [tips, setTips] = useState(null)
	const [weapons, setWeapons] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingId, setEditingId] = useState(null)
	const [editText, setEditText] = useState("")
	const [editWeapon, setEditWeapon] = useState(null)

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
	
	const startEdit = (item) => {
		setEditingId(item.id)
		setEditText(item.content)
		setEditWeapon(item.weapon?.id || null)
	}

	const cancelEdit = () => {
		setEditingId(null)
		setEditText("")
		setEditWeapon(null)
	}

	const saveEdit = (item) => {
		updateTip({
			id: item.id,
			content: editText,
			weapon: editWeapon
		})
		cancelEdit()
	}


	const handleDelete = (item) => {
		deleteTip(item)
	}

	const Tip = ({item}) => {
		const weaponId = item.weapon?.id
		const weapon = weaponId ? weapons[weaponId] : null
		const isEditing = editingId === item.id

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
						<Button title="Save" onPress={() => saveEdit(item)} />
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
					<Button title="Edit" onPress={() => startEdit(item)} />
					<Button title="Delete" onPress={() => handleDelete(item)} />
				</View>
			</View>
		)
	}

	return (loading ? <ActivityIndicator/> : error ? <Text>{error.toString()}</Text> :
		<FlatList
			data={tips}
			renderItem={({item}) => <Tip item={item} />}
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