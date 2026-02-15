import { useState } from "react"

import { Text, TextInput, Pressable, StyleSheet, View } from 'react-native'
import { addTip } from "../services/firebase"
import { WeaponPicker } from "./weapon-picker"
import { SplatoonText } from "./splatoon-text"

export const NewTip = ({forId}) => {
	const [text, onChangeText] = useState("")
	const [weapon, setWeapon] = useState(null)
	const [doneSubmitting, setDoneSubmitting] = useState(null)
	const [error, setError] = useState(null)
	const [buttonColor, setButtonColor] = useState('#2ecc71')

	const getRandomColor = () => {
		const colors = ['#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#1abc9c', '#f39c12']
		return colors[Math.floor(Math.random() * colors.length)]
	}

	const handleTextChange = (newText) => {
		onChangeText(newText)
		setButtonColor(getRandomColor())
	}
	const submit = () => {
		setDoneSubmitting(false)
		setError(null)
		
		try {
			addTip({
				content: text,
				date: new Date(),
				map: forId,
				weapon: weapon
			})
			setDoneSubmitting(true)
			onChangeText("")
		} catch (err) {
			console.log(err)
			setDoneSubmitting(null)
			setError(err?.message || "Failed to submit tip")
		}
	}


	const StatusHead = () => {
		if (doneSubmitting == null){
			return
		}

		if (doneSubmitting == true){
			return (
				<Text style={styles.success}>Tip successfully submitted !</Text>
			)
		}

		if (doneSubmitting == false){
			return (
				<ActivityIndicator/>
			)
		}

		if (error){
			return (
				<Text>{error}</Text>
			)
		}

	}

	return (
		<>
			<StatusHead/>
			<View style={styles.inputRow}>
				<TextInput
					onChangeText={handleTextChange}
					value={text}
					placeholder="Your tip"
					style={styles.textInput}
					placeholderTextColor="#999"
					multiline
				/>
				<View style={styles.controlsColumn}>
					<Pressable 
						style={[
							styles.submitButton, 
							{ backgroundColor: buttonColor },
							(!text || text.trim() === "") && styles.disabledButton
						]}
						onPress={submit}
						disabled={!text || text.trim() === ""}
					>
						<SplatoonText style={styles.submitButtonText}>Submit</SplatoonText>
					</Pressable>
					<WeaponPicker 
						selectedWeapon={weapon}
						onWeaponSelect={setWeapon}
					/>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	inputRow: {
		flexDirection: 'row',
		gap: 10,
	},
	textInput: {
		flex: 1,
		color: 'white',
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 5,
		fontFamily: 'Splatoon',
	},
	controlsColumn: {
		justifyContent: 'space-between',
		gap: 10,
	},
	submitButton: {
		padding: 10,
		alignItems: 'center',
		borderRadius: 5,
	},
	disabledButton: {
		backgroundColor: '#555',
		opacity: 0.5,
	},
	submitButtonText: {
		color: 'white',
	},
	success: {
		color: 'white',
	}
})