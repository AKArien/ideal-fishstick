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
			<TextInput
				onChangeText={onChangeText}
				value={text}
				placeholder="Your tip"
			/>
			<View style={styles.actionRow}>
				<Button
					onPress={submit}
					title="Submit"
					disabled={!text || text.trim() === ""}
					style={styles.submit}
				/>
				<WeaponPicker 
					selectedWeapon={weapon}
					onWeaponSelect={setWeapon}
				/>
			</View>
		</>

	)
}

const styles = StyleSheet.create({
	actionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	submit: {
		flex: 1,
	},
	success: {}
})