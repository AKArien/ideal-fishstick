
export const Rotations = ({navigation, route}) => {
	const [rotations, setRotations] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {

	})

	return (loading ? <ActivityIndicator/> : error ? <Text>{error}</Text> :
		<FlatList
			data={sections}
			renderItem={(section) =>
				<Card
					text={section.entry}
					img={section.img}
					goto={section.goto}
					navigation={navigation}
				/>
			}
			keyExtractor={(item, index) => item[index]}
		/>
	)
}
