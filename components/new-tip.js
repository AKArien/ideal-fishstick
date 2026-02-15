import { useState } from "react"

import { Text, TextInput, Button, StyleSheet, View } from 'react-native'
import { addTip } from "../services/firebase"
import { WeaponPicker } from "./weapon-picker"

export const NewTip = ({forId}) => {
	const [text, onChangeText] = useState("")
	const [weapon, setWeapon] = useState(null)
	const [doneSubmitting, setDoneSubmitting] = useState(null)
	const [error, setError] = useState(null)

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
					onChangeText={onChangeText}
					value={text}
					placeholder="Your tip"
					style={styles.textInput}
					placeholderTextColor="#999"
				/>
				<View style={styles.controlsColumn}>
					<Button
						onPress={submit}
						title="Submit"
						disabled={!text || text.trim() === ""}
					/>
					<WeaponPicker 
						selectedWeapon={weapon}
						onWeaponSelect={setWeapon}
						style={styles.weaponPicker}
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
		width: "25%"
	},
	success: {
		color: 'white',
	}
	})