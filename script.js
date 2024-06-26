/*
@title: Coin Collector
@author: Aditi Ranjan
*/

const player = "p"
const coin = "c"
const wall = "w"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ coin, bitmap`
................
................
.......222......
.....222222.....
....22222222....
...2222222222...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
...2222222222...
....22222222....
.....222222.....
.......222......
................
................` ],
  [ wall, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000` ]
)

setSolids([wall])

const melody = tune`
16000`
const playback = playTune(melody, Infinity)

let level = 0
const levels = [
  map`
p.w.
.wc.
....`,
  map`
p...
....
.c..
.w..`,
  map`
pw..
....
....
..c.`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  // Check whther or not the player collected the coin
  const playerpos = getFirst(player)
  const coinPos = getAll(coin)

  if (coinPos.some(c => c.x === playerpos.x && c.y === playerpos.y)) {
    // Move to next level or restart
    level = (level + 1) % levels.length
    setMap(levels[level])
  }
})
