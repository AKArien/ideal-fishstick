
export default const rotations = ({navigation, route}) => {
	const [rotations, setRotations] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {

	})

	(loading ? return <ActivityIndicator/> : error ? return <Text>{error}</Text> :
		return (
			<FlatList
				data={sections}
				renderItem={(section) =>
					<Card
						text={section.entry}
						img={section.img}
						goto={section.goto}
					/>
				}
				keyExtractor={(item, index) => item[index]}
			/>
		)
	)
}
