# Montenegro fishing places — research 2026-10-27

## Evidence model

These are fishing waters/regions, NOT surveyed casting spots. A town coordinate means regional orientation, not water, parking, legal access, or safe descent. Lake coordinates are lake reference points, not shoreline access. No source supports an exhaustive list of all legal places. Suggested labels: `documented-bank` (source explicitly describes bank access), `fishing-water` (fishery documented, bank not checked), `regional-only` (coastal operator evidence, access unverified), `closed/reference` for closed waters. Keep legal status separate from physical access.

## Primary/local sources

- NTO: https://www.montenegro.travel/me/istrazi-crnu-goru/priroda-i-avanturizam/fly-fishing — national tourism; multiple rivers and lakes. Use only for water/species facts, NOT current legal permission. English page differs in seasonal claims: https://www.montenegro.travel/en/explore-montenegro/nature-and-adventure/fly-fishing
- PLAV: https://www.plavto.me/en/fishing/ — local tourism; Ljuča/Gusinje, Plav lake and Lim sectors. Intro translation unreliable; use the explicit species lists below it.
- ZAB: https://zabljak.travel/me/sportski-ribolov/ — local tourism; right bank of Veliko Crno jezero, Tara sectors. Published schedule should not override 2026 management notices.
- TIVAT: https://tivat.travel/en/tivat-experience/relaxation/ — local tourism; explicit fishing from shore and bay species.
- BUDVA: https://budva.travel/activities — local tourism; regional sea species and local clubs. License prices/limits appear old; do not reuse.
- DELFIN: https://ksrdelfin.com/ — local sea-fishing club; shore discipline and contacts.
- ULCINJ: https://ulcinj.travel/en/underwater-fishing/ — local tourism; confirms seabass in local waters, NOT bank access.
- SKADAR: https://nparkovi.me/edukativni-kutak/skadarsko-jezero-zivotinjski-svijet — national park species list.
- PIVA: https://parkpiva.com/listing/pivsko-jezero/ — park; recreational fishery confirmed.
- NIKSIC: https://rtnk.me/drustvo/za-vrijeme-zabrana-devet-tona-ribe-stize-u-niksicke-vode/ — 2026 interview with managing club president. Lake stocking, fish groups. Source contradicts itself on Liverovići trout, so omit trout for that lake.
- NIKSIC-STOCK: https://www.vijesti.me/vijesti/drustvo/759667/poribljena-tri-niksicka-jezera — 2025 club president interview explicitly confirms rainbow stocking in Krupac, Slano, Grahovo.
- PIVA-STOCK: https://verige.net/vijesti/pluzine-pivsko-jezero-poribljeno-sa-20-tona-pastrmke/ — 2023 reports club and municipality: rainbow stocking in Piva. Historical stocking, not present abundance.
- SASKO-STUDY: https://www.greenhome.co.me/wp-content/uploads/2025/03/Studija_zastite_Saskog_jezera.pdf — conservation study, old. Confirms perch and Prussian carp and describes governance problems. Only use as reference, not recommendation/legal permission.
- KOTOR-OPERATOR: https://fishingmontenegro.me/fishing-kotor-bay/ — first-party operator, nearshore seabass/bluefish; boat product, not confirmed bank access.
- BOJANA-OPERATOR: https://fishingmontenegro.me/fishing-ada-bojana/ — first-party operator; delta seabass/mullet/eel.
- HERCEG-OPERATOR: https://fishingmontenegro.me/fishing-herceg-novi/ — first-party operator; sea fishery, no bank verification.
- PETROVAC-OPERATOR: https://fishingmontenegro.me/fishing-petrovac/ — first-party operator; seabream, seabass, dentex (boat fishing evidence).
- COORDS: GeoNames ME export downloaded in `work/geonames/ME.txt`, https://download.geonames.org/export/dump/ME.zip . Coordinate arrays below are `[longitude,latitude]`. Prefer retaining GeoNames IDs where possible.

## Candidate atlas entries

### Coast (7 regions; most have UNVERIFIED bank access)

| Region | Coordinates | Fish supported by regional source | Access evidence | Sources |
|---|---|---|---|---|
| Herceg Novi | [18.53750,42.45306] | seabass; bluefish (operator regional claim) | regional-only; no surveyed bank | HERCEG-OPERATOR |
| Kotor Bay / Kotor | [18.76825,42.42067] | seabass, bluefish | regional-only; shoreline fishing from boat described | KOTOR-OPERATOR |
| Tivat Bay | [18.69361,42.43623] | seabass, gilthead bream, red mullet, horse mackerel | documented-bank at regional level; exact spot unverified | TIVAT |
| Budva coast | [18.83922,42.28721] | gilthead bream, mullet, black seabream | fishing-water; exact bank unverified | BUDVA, DELFIN |
| Petrovac | [18.94250,42.20556] | seabream, seabass, dentex | regional-only; boat fishery, no bank guarantee | PETROVAC-OPERATOR |
| Ulcinj coast | [19.22436,41.92936] | seabass | fishing-water; underwater fishery source, no bank guarantee | ULCINJ |
| Bojana delta / Ada Bojana | GeoNames island ID 3188425 [19.36111,41.86417], not exact mouth/shore | seabass, mullet, eel | fishing-water; operator boat evidence | BOJANA-OPERATOR |

### Rivers (14 areas)

| Area | Coordinate | Fish | Access | Source |
|---|---|---|---|---|
| Mrtvica canyon | [19.36750,42.71917] | brown trout | fishing-water | NTO |
| Lim / Andrijevica | [19.79194,42.73389] | brown trout, grayling, rainbow trout | fishing-water | NTO |
| Zlorečica | [19.79583,42.73444] | brown trout, grayling, rainbow trout | fishing-water | NTO |
| Lim / Berane | [19.87281,42.84333] | grayling, brown trout, chub | documented-bank | NTO |
| Bistrica / Berane | [19.86861,42.82222] | brown trout | fishing-water | NTO |
| Lim / Bijelo Polje | [19.74758,43.03834] | grayling, trout, cyprinids | fishing-water | NTO |
| Bistrica / Bijelo Polje | [19.78278,43.11250] | grayling, trout | fishing-water | NTO |
| Ljuboviđa | [19.74583,42.98972] | trout | fishing-water | NTO |
| Tara / Kolašin | [19.51653,42.82229] | trout, grayling | documented-bank in regional section | NTO |
| Tara / Mojkovac | [19.58330,42.96044] | trout, grayling | documented-bank in regional section | NTO |
| Ćehotina / Pljevlja | [19.35843,43.35670] | trout, grayling | fishing-water | NTO |
| Ljuča / Gusinje | [19.83389,42.56194] | grayling, brown trout | fishing-water | PLAV |
| Morača / Podgorica | [19.26309,42.44124] | Adriatic trout, cyprinids | fishing-water | NTO |
| Cijevna | [19.47611,42.43000] | Adriatic trout | fishing-water | NTO |

Huchen and marble trout occur in source lists but should be present only as protected fauna, not selectable legal target recommendations. Do not repeat NTO's grayling-at-Morača claim without fisheries confirmation; likely translation/ecological issue.

### Lakes (10 + 2 optional reference entries)

| Water | GeoNames ID; coordinates | Fish supported | Access evidence | Source |
|---|---|---|---|---|
| Lake Skadar | 7894239; [19.31667,42.16667] (whole-lake reference, not Montenegro bank) | carp, bleak, Prussian carp, chub, perch, eel | fishing-water; bank segments need park check | SKADAR |
| Krupac | 3318100; [18.89222,42.80056] | rainbow trout, carp, Prussian carp, catfish | fishing-water | NIKSIC, NIKSIC-STOCK |
| Slano | 3318096; [18.85528,42.76056] | rainbow trout, carp, Prussian carp, catfish | fishing-water | NIKSIC, NIKSIC-STOCK |
| Grahovsko | 3317346; [18.63083,42.67056] | rainbow trout (stocking evidence) | fishing-water | NIKSIC-STOCK |
| Liverovići | 3317558; [19.06139,42.74472] | carp; general club species list not lake-specific | fishing-water | NIKSIC, historical club statement https://onogost.me/vijest/srk-niksic-u-narednom-periodu-pojacati-kontrolu-na-svim-vodama |
| Piva reservoir | record Pivško Jezero; [18.87556,43.14667] | trout, rainbow trout stocking | fishing-water; steep canyon access unverified | PIVA, PIVA-STOCK |
| Plav lake | 3193214; [19.92611,42.59611] | grayling, chub, nase, lake trout forms | fishing-water | PLAV |
| Great Black Lake / Crno | record Crno Jezero; [19.09250,43.14611] | trout, char | documented-bank: RIGHT bank of Great Black Lake | ZAB |
| Biogradsko | 3204118; [19.60056,42.89833] | trout, char | fishing-water | NTO |
| Kapetanovo | 3198311; [19.23139,42.81472] | trout, char | fishing-water | NTO |
| OPTIONAL Šasko lake | 3191254; [19.33417,41.97417] | perch, Prussian carp, carp | reference only; governance/access must be checked | SASKO-STUDY |
| OPTIONAL Rijeka Crnojevića | town [19.02528,42.35639]; river [19.08806,42.30889] | carp, bleak, eel (regional records) | CLOSED/reference, not recommended spot | current order/legal audit |

## Activity season evidence (separate from permission)

Only NTO supplies explicit useful seasonal preference here: Andrijevica September–October; Šavnik rivers May–June and September–October; mountain lakes May–September. These are tourism recommendations, not bite probabilities, and not 2026 legal calendars. For sea species use species-level first-party guide already researched, label as seasonal tendency rather than guarantee.

## Important source conflicts / scope limits

1. NTO local-language vs English page: Berane Bistrica April–October vs all year; Tara regional May–November vs all year. Never encode these as definitive open months.
2. NTO broad list of mountain lakes is insufficient current permission. Park rules/closures override.
3. 2022 sea federation annual report explicitly criticized poor competition catches on Budva and Dobra Voda beaches: https://ssrm-cg.com/storage/2023/02/izvestaj-o-radu-2022.pdf . This is historical competition evidence, not proof fish absent now, but argues against promises of productive beach spots.
4. Marine protected parks (Platamuni, Katič, Stari Ulcinj) require legal overlay; don't invent coastal spots within them. Official overview: https://www.morskodobro.me/fajlovi/p1jnf14c0phc26voimn1e8n60o4.pdf .
5. Avoid shore suitability claims copied from charter catalogues: boat catches do not establish fish reachable from shore.

## Additional primary bank-access evidence at Skadar

Official management plan https://nparkovi.me/uploads/2023/08/PU-Skadarsko-jezero.pdf documents TWO equipped sports-fishing trails: Tanki rt on Vranjina embankment, and Morača from Bakine tigle to Vranjina peninsula at the river mouth. They have information/rest furniture. This is physical infrastructure evidence, NOT current legal permission. Tanki rt is also named in current closure lists; only mark these as `equipped-bank / legal-boundaries-check`, never all green. The park active-holiday page confirms park fishing and permit issue at Vranjina or duty warden: https://nparkovi.me/parks/Skadarsko%20jezero/active_holidays .
