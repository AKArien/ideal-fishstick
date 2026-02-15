import { Text, StyleSheet } from 'react-native'

export const SplatoonText = ({ style, ...props }) => {
	return <Text style={[styles.text, style]} {...props} />
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Splatoon',
	}
})