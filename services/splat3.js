import {get_w_cache} from "./api_cache.js"

export const schedules_all = async () => {
	const d = await get_w_cache("https://splatoon3.ink/data/schedules.json", 60 * 60 * 1000)
	return d
}

export const turf_sched = async () => {
	const data = await schedules_all()
	const nodes = data.data.regularSchedules.nodes
	return nodes
}

// extracts data from bankara schedules, as it’s formatted slightly differently, into the same format as the others
const an_sched_helper = async (index) => {
	const data = await schedules_all()
	const nodes = data.data.bankaraSchedules.nodes
	
	return nodes.map(element => ({
		...element,
		bankaraMatchSettings: element.bankaraMatchSettings[index]
	}))
}


export const an_series_sched = async () => {
	return await an_sched_helper("0")
}

export const an_open_sched = async () => {
	return await an_sched_helper("1")
}

export const x_sched = async () => {
	const data = await schedules_all()
	return data.data.xSchedules.nodes
}