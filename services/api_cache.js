import AsyncStorage from '@react-native-async-storage/async-storage';

export const get_w_cache = async (url, age_limit) => {
	const cache_key = `cache_${url}`
	const timestamp_key = `cache_time_${url}`

	try {
		const cached_time = await AsyncStorage.getItem(timestamp_key)
		const current_time = Date.now()

		if (cached_time && current_time - parseInt(cached_time, 10) < age_limit) {
			const cached_data = await AsyncStorage.getItem(cache_key)
			if (cached_data) {
				console.log("Loaded cache for request to " + url)
				return JSON.parse(cached_data)
			}
		}

		// cache is too old, refetch
		console.log("Made a request to " + url)
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`API call failed: ${response.status}`)
		}
		const data = await response.json()

		// Store data and timestamp in AsyncStorage
		await AsyncStorage.setItem(cache_key, JSON.stringify(data))
		await AsyncStorage.setItem(timestamp_key, current_time.toString())

		return data
	} catch (error) {
		console.error('Error in fetchWithCache:', error)
		throw error
	}
}