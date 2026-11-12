// Checklist content, trimmed to collectibles and 100% extras. Source: Zelda Dungeon's Wind Waker (HD) walkthrough and wiki.
//
// Format, one entry per line:
//   # Chapter title | Region     chapter
//   ## Group title               group inside a chapter
//   > Note                       short note shown under the group title
//   - Item text {tags}           checklist item
//
// Tags (all optional):
//   {hp:N} Piece of Heart #N      {ch:N} Treasure Chart #N      {hc} Heart Container      {shard} Triforce Shard
//   {ts} Tingle Statue            {song:key}  {pearl:key}       {boss:key}                {jp:N} Joy Pendants needed
//   {g:key:level} unlocks a gear level on the Hub ({g2:...} unlocks a second one from the same item)
//   {m} minor (dimmed)            {miss} missable               {opt} optional
//   {old:..} {oldb:..} {oldc:..} {oldd:..} the item's earlier wording, so saved progress follows it when the text changes.
//   Leave these in. An item's id comes from its text, so deleting one orphans anybody's saved check.
window.DATA_TXT = `
# Outset Island | Chapter 1
## 1.1 Getting the Telescope
- Telescope from Aryll (eastern island tower) {g:telescope:1}
## 1.2 Forest of Fairies
- Hero's Sword from Orca {g:sword:1}
- Shield from Grandma {g:shield:1}
## 1.3 Rupees on Outset Island
- Orange Rupee (100): chest behind the hole under the house porch
- Beedle's Shop Ship: Bait Bag (20 rupees) {g:bait:1}
# Forsaken Fortress | Chapter 2
## 2.1 Pirate Ship
- Spoils Bag from Niko {g:spoils:1}
## 2.2 Forsaken Fortress
- Pirate's Charm from Tetra {g:charm:1}
- Piece of Heart: chest in the jail cell behind the barrels (step on the switch) {hp:1}
- Dungeon Map (chest in the room above the jail room)
- Compass (chest behind barrels on a platform)
# Windfall Island | Chapter 3
## 3.1 Tingle's Bottle and the Boat Sail
- Tingle's Bottle from Tingle {g:tingle:1}
- Picto Box (large chest at the end of the hole maze) {g:picto:1}
- Buy the Sail from Zunari (80 rupees) {g:sail:1}
## 3.2 Hide-and-Seek
- Piece of Heart from Ivan after catching all four {hp:2}
- Miss Marie apology quest: Purple Rupee
- Joy Pendant from the tree in front of the Bomb Shop
## 3.3 Windfall Side Quests
- Piece of Heart: beat Sinking Ships in 24 cannonballs or less {hp:3}
- Treasure Chart: beat Sinking Ships a second time (leads to 200 rupees) {ch:7}
- Purple Rupee for each later win
- Treasure Chart: beat the record with 19 bombs or less (leads to a Piece of Heart) {ch:23}
- Orange Rupee (100) for beating the record
- Pictograph 1: Garrickson sending a letter at the red postbox near the docks
- Pictograph 2: Gossack, the most cowardly resident (cafe, upstairs)
- Pictograph 3: Anton and Linda looking at each other (outside Lenzo's studio)
- Joy Pendant from Lenzo after the third pictograph
- Deluxe Picto Box from Lenzo {g:picto:2}
- Treasure Chart from Minenco after the photo {ch:33}
## 3.4 Pawprint Isle
- Piece of Heart: chest after the three Red ChuChus (completes your first Heart Container) {hp:4}
- Treasure Chart from the man on the platform east of the island {ch:34}
# Dragon Roost Island | Chapter 4
## 4.1 Dragon Roost Island
- The Wind Waker from the King of Red Lions {g:wwaker:1}
- Delivery Bag from Quill {g:delivery:1}
- Empty Bottle from Medli {g:b1:1}
- Fill the Empty Bottle with water near the rock
# Dragon Roost Cavern | Chapter 5
## 5.1 Dungeon Map and Compass
- Small Key (chest revealed by lighting two torches)
- Dungeon Map (chest, solidify the lava with a water pot)
- Small Key (chest on the higher ledge)
- Compass (chest, open before burning the far planks)
- Small Key (chest up the ladder)
## 5.2 Grappling Hook
- Small Key (hidden in a Kargaroc's nest on the outside stairs)
- Joy Pendant (chest in the dark room, light torches and burn planks)
- Treasure Chart (chest, light the second torch; leads to 200 rupees) {ch:39} {opt} {oldb:Treasure Chart (optional chest, light the second torch; leads to 200 rupees)}
- Break the dark orbs for Joy Pendants and Skull Necklaces
- Grappling Hook from Medli {g:grapple:1}
## 5.3 Big Key
- Defeat the Bokoblins on the bridge, Joy Pendant chest after the bridge falls
- Dragon Tingle Statue (bomb reveals the chest) {ts} {opt} {oldb:Dragon Tingle Statue (optional, bomb reveals the chest)}
- Big Key (chest surrounded by flames)
## 5.4 Dungeon Extras
- Treasure Chart (chest behind panels; leads to a Piece of Heart) {ch:11} {opt} {oldb:Treasure Chart (optional chest behind panels; leads to a Piece of Heart)}
## 5.5 Boss: Gohma
- Nintendo Gallery: photo of Gohma (needs the Deluxe Picto Box) {miss}
- Defeat Gohma {boss:gohma}
- Heart Container from Gohma {hc}
- Din's Pearl from Prince Komali {pearl:din}
# Forest Haven | Chapter 6
## 6.1 Return to Windfall Island
- Wind's Requiem learned at the Wind Shrine {song:requiem}
- Tott at the lone gravestone near the Town Jail: Song of Passing (day/night changer) {song:passing}
- Auction House (night only): Treasure Chart, starts at 5 rupees {ch:18}
- Auction House: Treasure Chart, starts at 60 rupees {ch:38}
- Auction House: Piece of Heart, starts at 80 rupees {hp:20}
- Auction House: Swift Sail (HD only), starts at 100 rupees {g:sail:2}
- Auction House: Joy Pendant, starts at 40 rupees (not recommended)
- Kashiko's Letter: Piece of Heart from the Dragon Roost Island mailbox {hp:5}
- Kamo's request: full moon pictograph (HD Deluxe Picto Box) for a Treasure Chart {ch:31}
- Playing Cupid: Linda and Anton, cafe bar, Piece of Heart {hp:21}
- Lenzo's Secret: photo of Lenzo and Minenco, shown to Pompie and Vera, for a Treasure Chart {ch:24}
- Lenzo's secret back room: two chests (Purple Rupee and a Treasure Chart) {ch:29}
## 6.2 The Great Sea
- Bomb Island submarine: defeat the three Bokoblins (Pink Bokoblin raft drops Joy Pendant spoils)
- Second Empty Bottle (submarine treasure chest) {g:b2:1}
## 6.3 Forest Haven
- Forest Firefly (bottle catch; Joy Pendant in HD)
- Deku Leaf from the top of Forest Haven {g:leaf:1}
- Magic Meter, introduced with the Deku Leaf {g:magic:1}
## 6.4 Nintendo Gallery and More
- Nintendo Gallery (seagull and switch puzzle with a Hyoi Pear)
- Carlov figurine trade (pictographs of Gohma and Kogoli)
- Gohma pictograph (Dragon Roost Cavern boss, missable) {miss}
- Kogoli pictograph (Rito on Dragon Roost Island, becomes missable) {miss}
- Treasure Chart: chest on a distant southeast island (Wind's Requiem blows you there) {ch:3}
# Forbidden Woods | Chapter 7
## 7.1 Dungeon Map and Compass
- Dungeon Map (chest at the top of the first room, after the Green ChuChus)
- Compass (chest in a small area of the vine maze)
- Small Key (chest on the raised platform after the vine maze)
- Joy Pendant (on the platforms in the vine maze room, fly with a Boko Bulb) {opt} {oldb:Joy Pendant (optional, on the platforms in the vine maze room, fly with a Boko Bulb)}
## 7.2 Boomerang
- Joy Pendant (chest on the high platform via pole, Grappling Hook and branches) {opt} {oldb:Joy Pendant (optional chest on the high platform via pole, Grappling Hook and branches)}
- Boomerang from the chest {g:boomerang:1}
- Joy Pendant (chest in the spiked plants room, fly across with the Deku Leaf)
## 7.3 Big Key
- Forbidden Tingle Statue (bomb on the lowest platform) {ts} {opt} {oldb:Forbidden Tingle Statue (optional, bomb on the lowest platform)}
- Treasure Chart (chest in the hollow tree stump, drop a bomb on the plant) {ch:15} {opt} {oldb:Treasure Chart (optional chest in the hollow tree stump, drop a bomb on the plant)}
- Big Key (hit five switches on the ramp with the Boomerang)
## 7.4 Boss: Kalle Demos
- Joy Pendant (chest after defeating the Mothulas)
- Treasure Chart (chest at the top, Boko Bulbs) {ch:1} {opt} {oldb:Treasure Chart (optional chest at the top, Boko Bulbs)}
- Defeat Kalle Demos {boss:kalle}
- Heart Container {hc}
- Farore's Pearl from the Great Deku Tree {pearl:farore}
# Nayru's Pearl | Chapter 8
## 8.1 Great Sea Goodies
- Piece of Heart: Prince Komali's father's letter at the Forest Haven postbox {hp:6}
- Cliff Plateau Isles cavern: defeat the Boko Babas, Boko Stick, Joy Pendant chest (vines disappear)
- Treasure Chart: chest atop the larger island, Cliff Plateau Isles {ch:25}
- Piece of Heart: sunken treasure at Five-Star Isles (Chart #33) {hp:7}
- Piece of Heart: submarine at the far southeast (Keese and Bokoblin, ladder, chest) {hp:8}
- Piece of Heart: sunken treasure at Angular Isles (Chart #15) {hp:9}
- Piece of Heart: chest atop the Angular Isles block island (Blue ChuChu nearby) {hp:10}
- Magic Meter Upgrade: defeat the 4-eyed Big Octo and speak to the Great Fairy {g:magic:2}
- Treasure Chart: submarine north of Headstone Island (bomb-carrying Rats) {ch:14}
- Piece of Heart: seagull delivery atop Headstone Island {hp:11}
- Treasure Chart: Mothula room through the hole at Horseshoe Island {ch:8}
- Treasure Chart: chest on the central island of the Horseshoe region {ch:28}
- Piece of Heart: sunken treasure west of Diamond Steppe Island (Chart #23) {hp:12}
- Piece of Heart: chest atop Needle Rock Isle (seagull switch, Kargarok guards) {hp:13}
## 8.2 Greatfish Isle
- Piece of Heart: chest in the cove northwest of Greatfish Isle (Deku Leaf) {hp:14}
- Piece of Heart: submarine at Six-Eye Reef (three Moblins) {hp:15}
## 8.3 Windfall Island
- Niko's rope-swinging mini-game: Bombs chest on the Pirate Ship {g:bombs:1}
## 8.4 Outset Island
- Fairy Fountain: Great Fairy upgrades your Wallet to 1,000 rupees {g:wallet:1}
- Capture a fairy in a bottle (Forest of Fairies pond)
- Orca: 100 hits for a Purple Rupee
- Orca: 300 hits for an Orange Rupee
- Piece of Heart: Orca, 500 hits {hp:16}
- Silver Rupee: Orca, 999 hits {opt} {oldb:Silver Rupee: Orca, 999 hits (optional)}
- Nayru's Pearl from Jabun in the whirlwind cave {pearl:nayru}
## 8.5 More Fun on the Great Sea
- Golden Feather: platform east of Five-Eye Reef (Bokoblins, Joy Pendants)
- Piece of Heart and Red Rupee: platform east of Stone Watcher Island (turrets) {hp:17}
- Treasure Chart: Private Oasis, higher ledge {ch:27}
- Piece of Heart: sunken treasure at Tingle Island (12-eyed Big Octo) {hp:18}
- Piece of Heart: Salvatore's Barrel Shoot, first win (50 rupees) {hp:19}
- Treasure Chart: Barrel Shoot, second win {ch:17}
- Orange Rupee: repeated Barrel Shoot wins {opt} {oldb:Orange Rupee: repeated Barrel Shoot wins (optional)}
- Treasure Chart: submarine west of Northern Fairy Island (rope swing, Moblins) {ch:22}
- Wallet upgrade to 5,000 rupees: Great Fairy, Northern Fairy Island {g:wallet:2}
## 8.6 Windfall Island Collection
- Cabana Deed from Mrs. Marie {g:cabana:1} {jp:20}
- Treasure Chart from Mrs. Marie {ch:45} {jp:40}
- Piece of Heart: sunken treasure southwest of Crescent Moon Island (Chart #11) {hp:22}
- Treasure Chart: chest at Crescent Moon Island (Blue ChuChus) {ch:10}
- Treasure Chart: submarine northeast of Crescent Moon Island (torch room) {ch:9}
- Piece of Heart: Big Octo at Seven-Star Isles {hp:23}
- Orange Rupee and a letter with a Piece of Heart: Rito guard (20 Golden Feathers) {hp:24}
- Piece of Heart: Flight Control Platform (cyclone glide) {hp:25}
- Treasure Chart: chest at Star Belt Archipelago (platform guarded by Bokoblins) {ch:44}
- Orange Rupee: Big Octo southeast of Fire Mountain
- First Bomb upgrade (60 bombs): Great Fairy, Eastern Fairy Island {g:bombs:2}
- Piece of Heart: Bomb Island Cavern (Magtail and fire puzzle) {hp:26}
- Piece of Heart: sunken treasure at Forest Haven (Chart #31) {hp:27}
- Orange Rupee: Big Octo northwest of Private Oasis
- Treasure Chart and Skull Necklace: Southern Fairy Island platform {ch:40}
- Second Bomb upgrade (99 bombs): Great Fairy, Southern Fairy Island {g:bombs:3}
- Treasure Chart and Golden Feather: platforms south of Horseshoe Island {ch:43}
- Orange Rupee: Big Octo northwest of Diamond Steppe Island
- Piece of Heart: sunken treasure at Three-Eye Reef (Chart #38) {hp:28}
- Five Purple Rupees: shiny spots southeast of Three-Eye Reef
- Piece of Heart: Star Island cave (Magtails, Bokoblins, Moblins) {hp:29}
## 8.7 Great Sea Collection
- Piece of Heart: bench man after planting all 14 Town Flowers {hp:30}
- Treasure Chart: Rock Spire Island cave (light torches, defeat the Keese) {ch:37}
- Empty Bottle (500 rupees): Beedle's Shop Ship at Rock Spire Isle {g:b3:1}
- Piece of Heart (950 rupees): Beedle's Shop Ship at Rock Spire Isle {hp:31}
- Treasure Chart (900 rupees): Beedle's Shop Ship at Rock Spire Isle {ch:4}
- Orange Rupee and Piece of Heart: ship salvage at Rock Spire Isle {hp:32}
- Piece of Heart: sunken treasure at Southern Fairy Island (Chart #4) {hp:33}
# Tower of the Gods | Chapter 9
## 9.1 Dungeon Map and Compass
- Dungeon Map (chest behind the cracked wall, southeastern room) {opt} {oldb:Dungeon Map (optional chest behind the cracked wall, southeastern room)}
- Small Key (light the two torches across the box-line room)
- Joy Pendant (chest, west side of the sticks and torches room) {opt} {oldb:Joy Pendant (optional chest, west side of the sticks and torches room)}
- Compass (chest behind the northwest door, guarded by a Bubble) {opt} {oldb:Compass (optional chest behind the northwest door, guarded by a Bubble)}
## 9.2 Command Melody
- Goddess Tingle Statue (bomb on the higher platform in the Beamos room) {ts} {opt} {oldb:Goddess Tingle Statue (optional, bomb on the higher platform in the Beamos room)}
- Command Melody from the stone tablet in the large central room {song:command}
## 9.3 Hero's Bow
- Hero's Bow from the chest {g:bow:1}
- Treasure Chart (compass room chest, shoot the eye to lift its gate) {ch:6} {opt} {oldb:Treasure Chart (optional, compass room chest, shoot the eye to lift its gate)}
- Joy Pendant (Armos Knight room through the eastern door) {opt} {oldb:Joy Pendant (optional, Armos Knight room through the eastern door)}
## 9.4 Big Key
- Treasure Chart (blue-symbol room, play Wind's Requiem; Armos Knights wake) {ch:30} {opt} {oldb:Treasure Chart (optional, blue-symbol room, play Wind's Requiem; Armos Knights wake)}
- Small Key (chest on the platform route after the two scales)
- Joy Pendant (chest on the moving platforms, shoot the eyes) {opt} {oldb:Joy Pendant (optional chest on the moving platforms, shoot the eyes)}
- Big Key (chest in the light switch room, after placing the statues and beating the Armos)
## 9.5 Boss: Gohdan
- Defeat Gohdan (shoot the eyes, bombs into his mouth) {boss:gohdan}
- Heart Container from Gohdan {hc}
# Hyrule Castle | Chapter 10
## 10.1 The Master Sword
- Master Sword on its pedestal in the basement {g:sword:2}
## 10.2 More Great Sea Goodies
- Ballad of Gales from Cyclos {song:gales}
- Piece of Heart: sunken treasure at Pawprint Isle (Chart #30) {hp:34}
- Wizzrobe battle south of Seven-Star Isles: Treasure Chart chest {ch:16}
## 10.3 Trading Sequence
> The three Goron merchants (Greatfish Isle, Bomb Island, Mother and Child Isles) charge rupees for every trade. The cost of each trade is listed on its step.
- Acquire the Town Flower from Zunari on Windfall Island.
- Give the Town Flower to Greatfish Isle Merchant for the Sea Flower. {old:Trade: Sea Flower} {oldb:Get the free Town Flower from Zunari on Windfall Island. Give it to the Greatfish Isle merchant (small raft) and he gives you the Sea Flower (0 rupees)} {oldc:Get the free Town Flower from Zunari on Windfall Island. Give it to the Greatfish Isle merchant (small raft) and he gives you the Sea Flower}
- Give the Sea Flower to the Greatfish Isle Merchant for the Exotic Flower. Cost: 20 rupees {old:Trade: Exotic Flower} {oldb:Give the Sea Flower to the Greatfish Isle merchant and he gives you the Exotic Flower (20 rupees)} {oldc:Give the Sea Flower to the Greatfish Isle merchant and he gives you the Exotic Flower. Cost: 20 rupees} {oldd:Give the Sea Flower to the Greatfish Isle Merchant for the Exotic Flower.}
- Give the Exotic Flower to the Bomb Island Merchant for the Sickle Moon Flag. Cost: 25 rupees {old:Trade: Sickle Moon Flag} {oldb:Give the Exotic Flower to the Bomb Island merchant (north of Forest Haven) and he gives you the Sickle Moon Flag (25 rupees)} {oldc:Give the Exotic Flower to the Bomb Island merchant (north of Forest Haven) and he gives you the Sickle Moon Flag. Cost: 25 rupees} {oldd:Give the Exotic Flower to the Bomb Island Merchant for the Sickle Moon Flag.}
- Give the Sickle Moon Flag to the Bomb Island Merchant for the Fountain Idol. Cost: 40 rupees {old:Trade: Fountain Idol} {oldb:Give the Sickle Moon Flag to the Bomb Island merchant and he gives you the Fountain Idol (40 rupees)} {oldc:Give the Sickle Moon Flag to the Bomb Island merchant and he gives you the Fountain Idol. Cost: 40 rupees} {oldd:Give the Sickle Moon Flag to the Bomb Island Merchant for the Fountain Idol.}
- Give the Fountain Idol to the Mother and Child Isles Merchant for the Big Sale Flag. Cost: 60 rupees {old:Trade: Big Sale Flag} {oldb:Give the Fountain Idol to the Mother and Child Isles merchant (two squares west of Windfall Island) and she gives you the Big Sale Flag (60 rupees)} {oldc:Give the Fountain Idol to the Mother and Child Isles merchant (two squares west of Windfall Island) and she gives you the Big Sale Flag. Cost: 60 rupees} {oldd:Give the Fountain Idol to the Mother and Child Isles Merchant for the Big Sale Flag.}
- Give the Big Sale Flag to the Greatfish Isle Merchant for the Hero's Flag. Cost: 35 rupees {old:Trade: Hero's Flag} {oldb:Give the Big Sale Flag to the Greatfish Isle merchant and he gives you the Hero's Flag (35 rupees)} {oldc:Give the Big Sale Flag to the Greatfish Isle merchant and he gives you the Hero's Flag. Cost: 35 rupees} {oldd:Give the Big Sale Flag to the Greatfish Isle Merchant for the Hero's Flag.}
- Give the Hero's Flag to the Greatfish Isle Merchant for the Postman Statue. Cost: 75 rupees {old:Trade: Postman Statue} {oldb:Give the Hero's Flag to the Greatfish Isle merchant and he gives you the Postman Statue (75 rupees)} {oldc:Give the Hero's Flag to the Greatfish Isle merchant and he gives you the Postman Statue. Cost: 75 rupees} {oldd:Give the Hero's Flag to the Greatfish Isle Merchant for the Postman Statue.}
- Give the Postman Statue to the Mother and Child Isles Merchant for the Shop Guru Statue. Cost: 100 rupees {old:Trade: Shop Guru Statue} {oldb:Give the Postman Statue to the Mother and Child Isles merchant and she gives you the Shop Guru Statue (100 rupees)} {oldc:Give the Postman Statue to the Mother and Child Isles merchant and she gives you the Shop Guru Statue. Cost: 100 rupees} {oldd:Give the Postman Statue to the Mother and Child Isles Merchant for the Shop Guru Statue.}
- Give the Shop Guru Statue to the Greatfish Isle Merchant for the Piece of Heart. Cost: 200 rupees {hp:35} {old:Piece of Heart: final trade reward (Greatfish Isle merchant)} {oldb:Give the Shop Guru Statue to the Greatfish Isle merchant and he gives you a Piece of Heart (200 rupees)} {oldc:Give the Shop Guru Statue to the Greatfish Isle merchant and he gives you a Piece of Heart. Cost: 200 rupees} {oldd:Give the Shop Guru Statue to the Greatfish Isle Merchant for the Piece of Heart.}
- Return to Zunari's Shop on Windfall Island to acquire the Magic Armor. {g:armor:1} {old:Magic Armor from Zunari's Shop, after the trades} {oldb:Return to Zunari's Shop on Windfall Island for the Magic Armor} {oldc:Return to Zunari's Shop on Windfall Island for the Magic Armor}

## 10.4 Withered Deku Trees
- Collect Forest Water in a bottle at Forest Haven
- Piece of Heart: reward from the final tree {hp:36}
## 10.5 Forsaken Fortress Revisited
- Skull Hammer from the chest after Phantom Ganon {g:hammer:1}
- Helmaroc King, phase 2 (aerial attacks, pecking attack, mask removal, final hits) {boss:helmaroc}
- Heart Container after the Helmaroc King {hc}
# Earth Temple | Chapter 11
## 11.1 Eye-Reefs
- Cyclops Reef: Treasure Chart (defeat the battleships, then fly to the chest with the Deku Leaf) {ch:21}
- Two-Eye Reef: Treasure Chart (same method) {ch:13}
- Three-Eye Reef: Treasure Chart (same method) {ch:32}
- Four-Eye Reef: Treasure Chart (same method) {ch:19}
- Five-Eye Reef: Treasure Chart (same method) {ch:41}
- Six-Eye Reef: Treasure Chart (same method) {ch:26}
- Sunken treasure: Four-Eye Reef (Chart #41), Great Fairy Chart
## 11.2 Even More Great Sea Goodies
- Quiver upgrade to 60 arrows: Thorned Fairy Island Great Fairy (hit the switch with the Skull Hammer) {g:quiver:1}
- Quiver upgrade to 99 arrows: Western Fairy Island Great Fairy (hit the switch to clear the fire) {g:quiver:2}
- Fire Arrows and Ice Arrows from the Fairy Queen (Mother and Child Isles) {g:fire:1} {g2:ice:1}
- Piece of Heart: Kreeb, for relighting the lighthouse {hp:37}
- Piece of Heart: chest on the small island southwest of Windfall (Deku Leaf, night only) {hp:38}
- 4th and final Empty Bottle from Mila (answer her questions correctly) {g:b4:1}
- Piece of Heart: Maggie, for showing her the Moblin's Letter {hp:39}
- Treasure Chart from Maggie's Father (20 Skull Necklaces) {ch:2}
- Treasure Chart (HD only) from the pig mini-game, or a Purple Rupee if you miss the time {ch:42}
- Piece of Heart: sunken treasure at Rock Spire Isle (Chart #2) {hp:40}
## 11.3 Fire and Ice Islands
- Power Bracelets from the chest in Fire Mountain {g:bracelets:1}
- Treasure Chart (frozen chest, Ice Ring Isle) {ch:36}
- Iron Boots from the chest on Ice Ring Isle {g:boots:1}
- Orange Rupee (secret cave treasure)
## 11.4 Quick Overworld Goodies
- Piece of Heart: the pig digs up buried treasure after All-Purpose Bait {hp:41}
## 11.5 Finding the Earth Temple
- Earth God's Lyric from Laruto {song:earth}
## 11.6 Earth Temple
- Dungeon Map (chest after clearing the first ChuChu room)
- Small Key (invisible chest revealed by Medli's light)
- Compass (chest on the upper platform)
- Joy Pendant (chest in the Poe room)
- Mirror Shield from the chest after the Stalfos {g:shield:2}
- Joy Pendant (chest in the blue fog room, upper level) {opt} {oldb:Joy Pendant (optional chest in the blue fog room, upper level)}
- Joy Pendant (chest behind the light-revealed wall)
- Earth Tingle Statue (spiral-stair room, needs a bomb and the Deku Leaf) {ts} {opt} {oldb:Earth Tingle Statue (optional, spiral-stair room, needs a bomb and the Deku Leaf)}
- Treasure Chart (chest after the Floormaster maze) {ch:20}
- Small Key (maze chest)
- Joy Pendant (chest on the raised platform, mirror puzzle)
- Treasure Chart (chest after the Stalfos room) {ch:12}
- Big Key (chest in the dark room with a Darknut and two Blue Bubbles)
- Defeat Jalhalla {boss:jalhalla}
- Heart Container from Jalhalla {hc}
- Master Sword power restored (play the Earth God's Lyric with Medli) {g:sword:3}
# Wind Temple | Chapter 12
## 12.1 Overworld Goodies
- Piece of Heart: sunken treasure at Bomb Island (Chart #20) {hp:42}
## 12.2 Finding the Wind Temple
- Wind God's Aria from the statue inside Gale Isle {song:aria}
## 12.3 Wind Temple
- Chest: Orange Rupee (south of the room)
- Wind Tingle Statue (bomb in the narrow gap) {ts} {opt} {oldb:Wind Tingle Statue (optional, bomb in the narrow gap)}
- Joy Pendant (chest in the left alcove, middle of the room)
- Dungeon Map (chest, southern land)
- Small Key (chest in the higher area)
- Treasure Chart (chest appears after the enemies are defeated) {ch:35}
- Hookshot from the chest {g:hookshot:1}
- Compass (chest on the platform after the fourth)
- Joy Pendant (chest in Makar's cell)
- Joy Pendant (chest on the eastern side of the highest area)
- Small Key (chest behind the gate)
- Big Key (chest after the Darknuts)
- Treasure Chart (chest appears after the Bokoblins are defeated) {ch:5}
- Defeat Molgera {boss:molgera}
- Heart Container from Molgera {hc}
- True Master Sword after Makar's scene in the blue light {g:sword:4}
# The Triforce | Chapter 13
## 13.1 Final Heart Pieces
- Piece of Heart: sunken treasure at Thorned Fairy Island (Chart #5) {hp:43}
- Treasure Chart (HD only): chest in the Wizzrobe cavern {ch:46}
- Piece of Heart: sunken treasure at Two-Eye Reef (Chart #46) {hp:44}
## 13.2 The Ghost Ship
- Joy Pendant (chest in the ship area near the Wallmaster)
- Triforce Shard #1: chest on the Ghost Ship {shard}
## 13.3 Private Oasis
- Triforce Shard #2: chest revealed by Wind's Requiem {shard}
## 13.5 Needle Rock Isle
- Orange Rupee chest in the torch room
## 13.7 Stone Watcher Island
- Triforce Shard #3: chest revealed by Wind's Requiem {shard}
## 13.8 Overlook Island
- Triforce Shard #4: chest revealed by Wind's Requiem {shard}
## 13.9c Savage Labyrinth (Floors 21-30)
- Floor 30: Triforce Shard #5, warp to entrance {shard}
## 13.9e Savage Labyrinth (Floors 41-50)
- Floor 50: Hero's Charm (HD), warp to entrance {g:herocharm:1}
## 13.10 Completing the Triforce
- Salvage Triforce Shard from Triforce Chart #1: Greatfish Isle {shard}
- Salvage Triforce Shard from Triforce Chart #2: Stone Watcher Island {shard}
- Salvage Triforce Shard from Triforce Chart #3: Cliff Plateau Isles {shard}
# Ganon's Tower | Chapter 14
## 14.3 Ganon's Tower Maze
- Chest in the differently colored room: Light Arrows {g:light:1}
## 14.4 Final Battles
- Parry and stab the Master Sword into Ganon's head {boss:ganon}
`;
