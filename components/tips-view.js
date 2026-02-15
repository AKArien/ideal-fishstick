import { useState, useEffect } from "react"
import { ActivityIndicator, Text, FlatList, Image, View, StyleSheet, TextInput, Button, Pressable } from "react-native"

import { getWeapons, updateTip, deleteTip, getTipsFiltered } from "../services/firebase"
import { WeaponPicker } from "./weapon-picker"
import { SplatoonText } from "./splatoon-text"

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
					<Pressable style={styles.saveButton} onPress={saveEdit}>
						<SplatoonText style={styles.buttonText}>Save</SplatoonText>
					</Pressable>
					<Pressable style={styles.cancelButton} onPress={cancelEdit}>
						<SplatoonText style={styles.buttonText}>Cancel</SplatoonText>
					</Pressable>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.tipContainer}>
			<SplatoonText style={styles.tipText}>{item.content}</SplatoonText>
			{weapon && (
				<View style={styles.weaponInfo}>
					<Image 
						style={styles.weaponIcon}
						source={{ uri: weapon.img_url }}
					/>
					<SplatoonText style={styles.weaponName}>{weapon.name}</SplatoonText>
				</View>
			)}
			<View style={styles.buttonRow}>
				<Pressable style={styles.editButton} onPress={startEdit}>
					<SplatoonText style={styles.buttonText}>Edit</SplatoonText>
				</Pressable>
				<Pressable style={styles.deleteButton} onPress={handleDelete}>
					<SplatoonText style={styles.buttonText}>Delete</SplatoonText>
				</Pressable>
			</View>
		</View>
	)
}

export const TipsView = ({forId, filterWeapon}) => {
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

	const filteredTips = filterWeapon 
		? tips?.filter(tip => tip.weapon?.id === filterWeapon)
		: tips

	// render in a view because it is not scrollable, the TipsView container should be the one scrollable
	return (loading ? <ActivityIndicator/> : error ? <Text>{error.toString()}</Text> :
		<View>
			{filteredTips?.map((item) => <Tip key={item.id} item={item} weapons={weapons} />)}
		</View>
	)
}
const styles = StyleSheet.create({
	tipContainer: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	tipText: {
		color: 'white',
		fontSize: 14,
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
		color: '#aaa',
	},
	editInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 5,
		marginBottom: 10,
		minHeight: 60,
		color: 'white',
		fontFamily: 'Splatoon',
	},
	buttonRow: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 10,
	},
	editButton: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#3498db',
		borderRadius: 5,
	},
	deleteButton: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#e74c3c',
		borderRadius: 5,
	},
	saveButton: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#2ecc71',
		borderRadius: 5,
	},
	cancelButton: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#95a5a6',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
	},
})