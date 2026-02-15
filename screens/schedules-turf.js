import { useState, useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native';

import {Schedule} from "../components/schedules";
import {turf_sched} from "../services/splat3";

export const ScheduleTurf = ({navigation, route}) => {
    const [sched, setSched] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function get(){
			try {
				setSched(await turf_sched())
				setLoading(false)
			}
			catch (error){
				setLoading(false)
				setError(error)
			}
		}
		get()
	}, [])

    return (loading ? <ActivityIndicator /> : error ? <Text>{error.toString()}</Text> :
        <Schedule
            sched={sched}
			matchSettingName={"regularMatchSetting"}
			navigation={navigation}
        />
    )
}