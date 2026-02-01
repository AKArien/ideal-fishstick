
export default const Detail = ({navigation, route}) => {
	const { id, name, img } = route

	// todo : put throbber colour by the match mode
	(loading ? <ActivityIndicator /> : error ? <Text>error</Text> :
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
	)
}
