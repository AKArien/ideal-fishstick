# Splatip

Splatoon 3 rotations viewer with user-posted tips on each stage. Said tips can be filtered by weapon. Also features a view of all maps ordered by name.

## Starting

Like any node project :

```bash
git clone https://github.com/AKArien/ideal-fishstick.git
cd ideal-fishstick
# pnpm lovers, I too am in your camp, but it seems there are issues with pnpm and expo
npm install
```

For development, enter your firebase identifiers in the file services/firebase-config.js :

```js
export const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXX.firebaseapp.com",
  projectId: "XXXXXXXXXX",
  storageBucket: "XXXXXXXXXX.firebasestorage.app",
  messagingSenderId: "XXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXX"
}
```

Note that on your own database, you will have to manually insert documents in the `weapons` collection, which we will visualise here in json format as :
```js
{
    class: String // weapon class, not strictly needed, but is used to group in the UI
    img_url: String // url to the image representing the weapon
    name: String // name of the weapon (Splattershot, Splat Roller…)
}
```

Then, like any expo project :

```bash
npx expo start # --tunnel # might be needed on some networks
```

## Using

Hopefully, the UI is clear enough that no user guide is needed, however :
- From the home screen :
  - « View by modes » allows to view the upcoming rotations and the maps they will feature by game mode : Turf war, Anarchy series/open, X battles
  - « View by map » shows every existing map, in alphabetical order, regardless of if they are scheduled for a rotation soon.
- From any screen, clicking on a map will allow you to see tips left by other users.
  - Leave a tip for other people to read in the text field. You can indicate it concerns a certain weapon with the weapon selection popup.
  - Filter tips to only concern a single weapon by selecting it

## Uses…

Uses the [splatoon3.ink schedules api](https://splatoon3.ink/data/schedules.json), and thus, it also uses it’s assets as well.
