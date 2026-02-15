import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,where,onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'

import {firebaseConfig} from "./firebase-config.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getTips = (callback) => {
  const q = query(collection(db, 'tips'), orderBy('date', 'desc'))
  onSnapshot(q, snapshot => {
    let tips = []
    snapshot.forEach(doc => {
      tips.push({ id: doc.id, ...doc.data() })
    })
    callback(tips)
  })
}

export const getTipsFiltered = (mapId, callback) => {
  let q
  
  if (mapId !== null && mapId !== undefined) {
    q = query(
      collection(db, 'tips'),
      where('map', '==', mapId),
      orderBy('date', 'desc')
    )
  } else {
    q = query(collection(db, 'tips'), orderBy('date'))
  }
  
  return onSnapshot(q, snapshot => {
    let tips = []
    snapshot.forEach(doc => {
      tips.push({ id: doc.id, ...doc.data() })
    })
    callback(tips)
  })
}

export const addTip = (tip) => {
  const tipData = {
    ...tip,
    weapon: tip.weapon ? doc(db, 'weapons', tip.weapon) : null
  }
  addDoc(collection(db, 'tips'), tipData)
}

export const updateTip = tip => {
	const updateData = {
		content: tip.content,
		weapon: tip.weapon ? doc(db, 'weapons', tip.weapon) : null
	}
	updateDoc(doc(db, 'tips', tip.id), updateData)
}

export const deleteTip = tip => {
  deleteDoc(doc(db, 'tips', tip.id))
}


export const getWeapons = (callback) => {
  const q = query(collection(db, 'weapons'), orderBy('class'), orderBy("name"))
  onSnapshot(q, snapshot => {
    let weapons = []
    snapshot.forEach(doc => {
      weapons.push({ id: doc.id, ...doc.data() })
    })
    callback(weapons)
  })
}


export const getMaps = (callback) => {
  const q = query(collection(db, 'maps'), orderBy('name'))
  onSnapshot(q, snapshot => {
    let maps = []
    snapshot.forEach(doc => {
      maps.push({ id: doc.id, ...doc.data() })
    })
    callback(maps)
  })
}

// this is for convenience of development, used by schedules.
// in actual release, it’s role would be filled by a cron job or the like.
export const ensureMap = (mapData) => {
  const mapRef = doc(db, 'maps', mapData.vsStageId.toString())
  setDoc(mapRef, {
    name: mapData.name,
    img_url: mapData.image.url
  }, { merge: true })
}