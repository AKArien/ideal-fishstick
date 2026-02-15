import { useState, useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native';

import {Schedule} from "../components/schedules";
import {an_series_sched} from "../services/splat3";

export const ScheduleSeries = ({navigation, route}) => {
    const [sched, setSched] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function get(){
			try {
				setSched(await an_series_sched())
				setLoading(false)
			}
			catch (error){
				setLoading(false)
				setError(error)
			}
		}
		get()
	}, [])

    return (loading ? <ActivityIndicator /> : error ? <Text>{toString(error)}</Text> :
        <Schedule
            sched={sched}
			matchSettingName={"bankaraMatchSettings"}
			navigation={navigation}
        />
    )
}