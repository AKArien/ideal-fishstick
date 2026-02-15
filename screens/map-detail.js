import { useState } from 'react'
import { View } from 'react-native'

import {Card} from "../components/cards"
import {NewTip} from "../components/new-tip"
import {TipsView} from "../components/tips-view"
import {WeaponPicker} from "../components/weapon-picker"

export const MapDetail = ({navigation, route}) => {
	const { id, name, img } = route.params
	const [filterWeapon, setFilterWeapon] = useState(null)

	return (
		<>
			<Card
				text={name}
				img={img}
			/>
			<WeaponPicker
				selectedWeapon={filterWeapon}
				onWeaponSelect={setFilterWeapon}
			/>
			<NewTip
				forId={id}
			/>
			<TipsView
				forId={id}
				filterWeapon={filterWeapon}
			/>
		</>

	)
}