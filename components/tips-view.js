import { useState, useEffect } from "react"
import { ActivityIndicator, Text, FlatList, Image, View, StyleSheet, TextInput, Button, Pressable } from "react-native"

import { getWeapons, updateTip, deleteTip, getTipsFiltered, getAnswers, addAnswer, updateAnswer, deleteAnswer } from "../services/firebase"
import { WeaponPicker } from "./weapon-picker"
import { SplatoonText } from "./splatoon-text"

const Answer = ({ tipId, item }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editText, setEditText] = useState(item.content)

	const startEdit = () => {
		setIsEditing(true)
		setEditText(item.content)
	}

	const cancelEdit = () => {
		setIsEditing(false)
		setEditText(item.content)
	}

	const saveEdit = () => {
		updateAnswer(tipId, item.id, editText)
		setIsEditing(false)
	}

	const handleDelete = () => {
		deleteAnswer(tipId, item.id)
	}

	if (isEditing) {
		return (
			<View style={styles.answerContainer}>
				<View style={styles.answerContentArea}>
					<TextInput
						value={editText}
						onChangeText={setEditText}
						multiline
						style={styles.editInput}
					/>
				</View>
				<View style={styles.buttonColumn}>
					<Pressable style={styles.saveButton} onPress={saveEdit}>
						<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Save</SplatoonText>
					</Pressable>
					<Pressable style={styles.cancelButton} onPress={cancelEdit}>
						<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Cancel</SplatoonText>
					</Pressable>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.answerContainer}>
			<View style={styles.answerContentArea}>
				<SplatoonText style={styles.answerText}>{item.content}</SplatoonText>
			</View>
			<View style={styles.buttonColumn}>
				<Pressable style={styles.editButton} onPress={startEdit}>
					<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Edit</SplatoonText>
				</Pressable>
				<Pressable style={styles.deleteButton} onPress={handleDelete}>
					<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Delete</SplatoonText>
				</Pressable>
			</View>
		</View>
	)
}

const AnswersThread = ({ tipId }) => {
	const [answers, setAnswers] = useState([])
	const [newAnswerText, setNewAnswerText] = useState('')

	useEffect(() => {
		const unsubscribe = getAnswers(tipId, setAnswers)
		return () => unsubscribe && unsubscribe()
	}, [tipId])

	const handleAddAnswer = () => {
		if (newAnswerText.trim()) {
			addAnswer(tipId, newAnswerText)
			setNewAnswerText('')
		}
	}

	return (
		<View style={styles.answersThread}>
			{answers.map((answer) => (
				<Answer key={answer.id} tipId={tipId} item={answer} />
			))}
			<View style={styles.newAnswerContainer}>
				<View style={styles.answerContentArea}>
					<TextInput
						value={newAnswerText}
						onChangeText={setNewAnswerText}
						placeholder="Write an answer..."
						placeholderTextColor="#999"
						multiline
						style={styles.newAnswerInput}
					/>
				</View>
				<View style={styles.buttonColumn}>
					<Pressable style={styles.saveButton} onPress={handleAddAnswer}>
						<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Add</SplatoonText>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

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
			<View style={styles.tipOuterContainer}>
				<View style={styles.tipContainer}>
					<View style={styles.tipContentArea}>
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
					</View>
					<View style={styles.buttonColumn}>
						<Pressable style={styles.saveButton} onPress={saveEdit}>
							<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Save</SplatoonText>
						</Pressable>
						<Pressable style={styles.cancelButton} onPress={cancelEdit}>
							<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Cancel</SplatoonText>
						</Pressable>
					</View>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.tipOuterContainer}>
			<View style={styles.tipContainer}>
				<View style={styles.tipContentArea}>
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
				</View>
				<View style={styles.buttonColumn}>
					<Pressable style={styles.editButton} onPress={startEdit}>
						<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Edit</SplatoonText>
					</Pressable>
					<Pressable style={styles.deleteButton} onPress={handleDelete}>
						<SplatoonText style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">Delete</SplatoonText>
					</Pressable>
				</View>
			</View>
			<AnswersThread tipId={item.id} />
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

	return (loading ? <ActivityIndicator/> : error ? <Text>{error.toString()}</Text> :
		<View>
			{filteredTips?.map((item) => <Tip key={item.id} item={item} weapons={weapons} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	tipOuterContainer: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	tipContainer: {
		flexDirection: 'row',
		padding: 10,
		gap: 10,
	},
	tipContentArea: {
		flex: 1,
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
	buttonColumn: {
		gap: 5,
		minWidth: 60,
	},
	editButton: {
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#3498db',
		borderRadius: 5,
	},
	deleteButton: {
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#e74c3c',
		borderRadius: 5,
	},
	saveButton: {
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#2ecc71',
		borderRadius: 5,
	},
	cancelButton: {
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#95a5a6',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 12,
	},
	answersThread: {
		borderLeftWidth: 1,
		borderLeftColor: '#ddd',
		marginLeft: 20,
		paddingLeft: 10,
		paddingBottom: 10,
	},
	answerContainer: {
		flexDirection: 'row',
		paddingVertical: 8,
		gap: 10,
	},
	answerContentArea: {
		flex: 1,
	},
	answerText: {
		color: 'white',
		fontSize: 13,
	},
	newAnswerContainer: {
		flexDirection: 'row',
		paddingVertical: 8,
		gap: 10,
	},
	newAnswerInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 5,
		minHeight: 40,
		color: 'white',
		fontFamily: 'Splatoon',
	},
})