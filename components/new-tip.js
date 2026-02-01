

export const default NewTip = ({forId}) => {
	const { forId } = props
	const [text, onChangeText] = useState("")
	const [doneSubmitting, setDoneSubmitting] = useState(null)
	const [error, setError] = useState(null)

	const submit = () => {
		// call to firebase
	}

	const top = () => {

		return (
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
		)

	}

	return (
		<>
			<top/>
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

