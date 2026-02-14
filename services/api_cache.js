import AsyncStorage from '@react-native-async-storage/async-storage';

const get_w_cache = async (url, age_limit) => {
	const cache_key = `cache_${url}`
	const timestamp_key = `cache_time_${url}`

	try {
		const cached_time = await AsyncStorage.getItem(timestampKey)
		const current_time = Date.now()

		if (cached_time && current_time - parseInt(cached_time, 10) < age_limit) {
			const cached_data = await AsyncStorage.getItem(cacheKey)
			if (cached_data) {
				return JSON.parse(cachedData)
			}
		}

		// cache is too old, refetch
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`API call failed: ${response.status}`)
		}
		const data = await response.json()

		// Store data and timestamp in AsyncStorage
		await AsyncStorage.setItem(cacheKey, JSON.stringify(data))
		await AsyncStorage.setItem(timestampKey, currentTime.toString())

		return data
	} catch (error) {
		console.error('Error in fetchWithCache:', error)
		throw error
	}
}