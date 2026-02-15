import { useState, useEffect } from "react"
import { View, Text, Image, Pressable, FlatList, StyleSheet, Modal } from "react-native"
import { getWeapons } from "../services/firebase"

export const WeaponPicker = ({ selectedWeapon, onWeaponSelect }) => {
	const [weapons, setWeapons] = useState([])
	const [loading, setLoading] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		getWeapons((fetchedWeapons) => {
			setWeapons(fetchedWeapons)
			setLoading(false)
		})
	}, [])

	const handleSelect = (weaponId) => {
		onWeaponSelect(weaponId)
		setModalVisible(false)
	}

	const selectedWeaponData = weapons.find(w => w.id === selectedWeapon)

	const WeaponItem = ({ item }) => {
		const isSelected = item.id === selectedWeapon
		
		return (
			<Pressable 
				style={[styles.weaponItem, isSelected && styles.selectedWeapon]}
				onPress={() => handleSelect(item.id)}
			>
				<Image 
					style={styles.weaponImage}
					source={{ uri: item.img_url }}
				/>
				<Text style={styles.weaponName}>{item.name}</Text>
			</Pressable>
		)
	}

	return (
		<>
			<Pressable 
				style={styles.dropdownButton}
				onPress={() => setModalVisible(true)}
			>
				{selectedWeaponData ? (
					<>
						<Image 
							style={styles.selectedImage}
							source={{ uri: selectedWeaponData.img_url }}
						/>
						<Text>{selectedWeaponData.name}</Text>
					</>
				) : (
					<Text>Select a weapon</Text>
				)}
			</Pressable>

			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Choose a weapon</Text>
						<FlatList
							data={weapons}
							renderItem={({ item }) => <WeaponItem item={item} />}
							keyExtractor={(item) => item.id}
							numColumns={3}
						/>
						<Pressable 
							style={styles.closeButton}
							onPress={() => setModalVisible(false)}
						>
							<Text>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	dropdownButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
	},
	selectedImage: {
		width: 30,
		height: 30,
		marginRight: 10,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '90%',
		maxHeight: '80%',
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	weaponItem: {
		flex: 1,
		margin: 5,
		padding: 10,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
	},
	selectedWeapon: {
		borderColor: '#007AFF',
		borderWidth: 2,
		backgroundColor: '#e6f2ff',
	},
	weaponImage: {
		width: 60,
		height: 60,
		marginBottom: 5,
	},
	weaponName: {
		fontSize: 10,
		textAlign: 'center',
	},
	closeButton: {
		marginTop: 15,
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#ddd',
		borderRadius: 5,
	},
})