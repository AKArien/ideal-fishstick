import { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native';

import {Schedule} from "../components/schedules";
import {x_sched} from "../services/splat3";

export const ScheduleX = ({navigation, route}) => {
    const [sched, setSched] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function get(){
			try {
				setSched(await x_sched())
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
        />
    )
}