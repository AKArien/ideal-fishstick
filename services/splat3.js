import {get_w_cache} from "./api_cache.js"

export const schedules_all = async () => {
	return await get_w_cache("https://splatoon3.ink/data/schedules.json", 60 * 60 * 1000)
}

export const turf_sched = async () => {
	return await schedules_all.regularSchedules.nodes
}

export const anarchy_sched = async () => {
	return await schedules_all.bankaraSchedules.nodes
}