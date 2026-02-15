import { useState } from "react"

import { Text, TextInput, Button, StyleSheet } from 'react-native'
import { addTip } from "../services/firebase"

export const NewTip = ({forId}) => {
	const [text, onChangeText] = useState("")
	const [weapon, setWeapon] = useState(null)
	const [doneSubmitting, setDoneSubmitting] = useState(null)
	const [error, setError] = useState(null)

	const submit = () => {
		addTip({
			content: text,
			date: new Date(),
			map: forId,
			weapon: weapon
		})
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
			<Button
				onPress={submit}
				title="Submit"
				style={styles.submit}
			/>
		</>

	)
}

const styles = StyleSheet.create({
	submit: {},
	success: {}
})