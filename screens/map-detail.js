import {Card} from "../components/cards"
import {NewTip} from "../components/new-tip"
import {TipsView} from "../components/tips-view"

export const MapDetail = ({navigation, route}) => {
	const { id, name, img } = route

	// todo : put throbber colour by the match mode
	return (
		<>
			<Card
				text={name}
				img={img}
				goto={id}
			/>
			<NewTip
				forId={id}
			/>
			<TipsView
				forId={id}
			/>
		</>

	)
}
