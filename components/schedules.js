
export const Schedule = ({navigation, route}) => {
	const {get_sched_fn} = route.params

	const [sched, setSched] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function get(){
			try {
				setSched(await get_sched_fn())
				setLoading(false)
			}
			catch (error){
				setLoading(false)
				setError(error)
			}
		}
		get()
	}, [])

	const RenderStage = ({stage}) => {
		return (
			<Card
				text={stage.name}
				img={stage.image.url}
				goto={"map-detail", stage.vsStageId}
				navigation={navigation}
			/>
		)
	}

	const render_section = (item) => {
		return (
			<>
				<Text>Current stages</Text>
				<RenderStage stage={item."0"} />
				<RenderStage stage={item."1"} />
			</>
		)
	}

	return (
		<>
			<FlatList
				data = {vsStages}
				renderItem={render_section}
				keyExtractor={(item, index) => item[index]}
			/>
		</>
	)

}
