import { useState, useEffect } from "react"
import { View, Text, Image, Pressable, FlatList, StyleSheet, Modal } from "react-native"
import { getWeapons } from "../services/firebase"
import { Card } from "./cards"
import { SplatoonText } from "./splatoon-text"

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

	const unselectItem = {
		id: null,
		name: 'None',
		img_url: null
	}

	const weaponsWithUnselect = [unselectItem, ...weapons]

	const WeaponItem = ({ item }) => {
		const isSelected = item.id === selectedWeapon
		const isUnselectSlot = item.id === null
		
		return (
			<Pressable 
				style={[
					styles.weaponItem, 
					isSelected && styles.selectedWeapon,
					isUnselectSlot && styles.unselectItem
				]}
				onPress={() => handleSelect(item.id)}
			>
				{item.img_url ? (
					<>
						<Image 
							style={styles.weaponImage}
							source={{ uri: item.img_url }}
						/>
						<SplatoonText style={styles.weaponName}>{item.name}</SplatoonText>
					</>
				) : (
					<>
						<View style={styles.unselectIcon}>
							<Text style={styles.unselectIconText}>✕</Text>
						</View>
						<SplatoonText style={styles.weaponName}>{item.name}</SplatoonText>
					</>
				)}
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
						<SplatoonText 
							style={styles.selectedText}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{selectedWeaponData.name}
						</SplatoonText>
					</>
				) : (
					<>
						<View style={styles.dropdownNoneIcon}>
							<Text style={styles.dropdownNoneIconText}>✕</Text>
						</View>
						<SplatoonText style={styles.selectedText}>Select a weapon</SplatoonText>
					</>
				)}
			</Pressable>
			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setModalVisible(false)}
			>
				<Pressable 
					style={styles.modalOverlay}
					onPress={() => setModalVisible(false)}
				>
					<Pressable 
						style={styles.modalContent}
						onPress={(e) => e.stopPropagation()}
					>
						<Card
							child={
								<View style={styles.cardInner}>
									<FlatList
										data={weaponsWithUnselect}
										renderItem={({ item }) => <WeaponItem item={item} />}
										keyExtractor={(item) => item.id || 'unselect'}
										numColumns={2}
										scrollEnabled={true}
										contentContainerStyle={styles.weaponGrid}
									/>
									<Pressable 
										style={styles.closeButton}
										onPress={() => setModalVisible(false)}
									>
										<SplatoonText style={styles.closeButtonText}>Close</SplatoonText>
									</Pressable>
								</View>
							}
						/>
					</Pressable>
				</Pressable>
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
	maxWidth: "25%",
},
selectedImage: {
	width: 30,
	height: 30,
	marginRight: 10,
},
selectedText: {
	color: 'white',
	flex: 1,
},
dropdownNoneIcon: {
	width: 30,
	height: 30,
	marginRight: 10,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#ddd',
	borderRadius: 5,
},
dropdownNoneIconText: {
	fontSize: 20,
	color: '#666',
},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	modalContent: {
		maxWidth: '100%',
		maxHeight: '90%',
	},
	cardInner: {
		padding: 10,
	},
	weaponGrid: {
		paddingVertical: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 15,
		color: 'white',
	},
	weaponItem: {
		width: '47%',
		aspectRatio: 1,
		margin: '1.5%',
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		backgroundColor: 'rgba(255,255,255,0.1)',
	},
	selectedWeapon: {
		borderColor: '#007AFF',
		borderWidth: 2,
		backgroundColor: 'rgba(0,122,255,0.3)',
	},
	weaponImage: {
	width: '80%',
	height: '60%',
	marginBottom: 2,
},
weaponName: {
	fontSize: 12,
	textAlign: 'center',
	color: 'white',
},
unselectItem: {
	backgroundColor: 'rgba(255,255,255,0.1)',
},
unselectIcon: {
	width: '80%',
	height: '60%',
	marginBottom: 2,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#ddd',
	borderRadius: 5,
},
unselectIconText: {
	fontSize: 36,
	color: '#666',
},
	closeButton: {
		marginTop: 10,
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#555',
		borderRadius: 5,
	},
	closeButtonText: {
		color: 'white',
	},
})