
export default Detail = ({navigation, route}) => {
	const { id, name, img } = route

	// todo : put throbber colour by the match mode
	return (
		loading ? <ActivityIndicator /> : error ? <Text>error</Text> :
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
