# Montenegro fishing rules audit — 2026-10-27

## Implementation recommendation

Never render “confirmed open” from absence of a listed closure. Use these independent fields:

- `knownClosed`: explicit site/species closure covers selected date; red and excluded by “exclude known closures”.
- `specialRegime`: C&R, MPA zone, artificial flies, limited hours/days; amber.
- `needsConfirmation`: no current manager confirmation, marker is regional, or exact boundaries unavailable; neutral/amber.
- `activityMonths`: biological angling window only, not legal permission.
- `rulesChecked`: 2026-10-27. Rules are an evidence snapshot, not live legal status; after expiry of a multi-year ban revert to confirmation required, never green automatically.
- Month-only filtering: if a closure ends/starts mid-month, show “часть месяца закрыта” and the exact dates; do not treat whole March/May/June as open or closed.

The general sea/freshwater permit requirement is current and confirmed by ministry source S1. Marine and freshwater permits are separate; freshwater permits issued by manager of those waters. Every place still requires local permit/gear/size check.

## Sources and provenance

S1 — PRIMARY, Ministry of Agriculture, Forestry and Water Management, live page accessed 2026-10-27: https://www.gov.me/clanak/dozvole-za-sportsko-rekreativni-ribolov

S2 — SECONDARY LEGAL REPRODUCTION, consolidated current order, metadata: no. 06-318/26-12853/3, 1 June 2026; Gazette 75/2026 item 1396, published 3 June, effective 11 June; amended Gazette 133/2026 item 2298, last amendment 11 September 2026. Full text was indexed by web search even though direct open returns size error. https://invero.me/mne/montenegro/legislation/naredbu-o-ribolovnim-zabranima-lovostaju-i-minimalnim-velicinama-riba-i-drugih-vodenih-organizama-ispod-kojih-je-zabranjen-ulov--docbe85528b

S3 — SECONDARY ORIGINAL GAZETTE REPRODUCTION, item 1396, pp. 56–65, 3 June 2026. Confirms most of S2; this is June original, not September consolidation: https://vijestomat.me/en/gazette/sections/d5324b9d-c196-5a98-8f82-209716af23c2

S4 — PRIMARY, Morsko dobro official marine protected-area activity guide, 12 pages. Does NOT mean blanket ban in all marine parks. https://www.morskodobro.me/fajlovi/p1h3hh9d26751720n4g1k677fg4.pdf

S5 — PRIMARY, Morsko dobro protected areas landing page and current park-specific management links: https://www.morskodobro.me/me/zasticena-podrucja/morska-zasticena-podrucja

S6 — PRIMARY, NP Skadarsko jezero announcement 15 May 2026 (also used in preceding conversation): https://nparkovi.me/news/444/pocinje-sezona-sportskog-i-privrednog-ribolova-na-sarana-i-ostale-ciprinidne-vrste-u-np-skadarsko-jezero

S7 — PRIMARY PLANNING DOCUMENT, draft NP Biogradska gora 2026–2030. States transition to catch-and-release from 1 May 2026; June legal text S2 independently makes C&R mandatory. https://nparkovi.me/storage/images/news/1765830786.pdf

S8 — PRIMARY PLANNING DOCUMENT, NP Durmitor 2026–2030. Says controlled fishing on Tara and Crno Lake, no further stocking Crno Lake. Does not make all glacial lakes legal fishing waters. https://nparkovi.me/storage/images/news/1770983982.pdf

S9 — SECONDARY MIRROR of official National Parks social post, 1 October 2026: 2026 fishing season in Durmitor concluded 30 September. Direct original social permalink not found, so lower confidence than legal S2. https://www.findglocal.com/ME/Podgorica/408965572498447/Nacionalni-parkovi-Crne-Gore---National-parks-of-Montenegro

S10 — SECONDARY RULES SUMMARY, explicitly October 2026, agrees with S2, use as accessible user-facing guide not sole legal authority: https://ribolov.me/propisi/slatke/

S11 — PRIMARY TOURISM but internally stale on fishing details, May 6 2026: https://kolasin.me/me/ljetnje-aktivnosti/ribolov/ . Its Biogradsko times/quota conflict with 2026 park director and June law; do not use its “4 trout”/May–June schedule.

S12 — SECONDARY quotation from park director, 30 April 2026, says Biogradsko daily 08–17, three fish until new ministry order C&R. This explains subsequent change, not current bag limit: https://espona.me/index.php/drustvo/18569-ribolov-na-biogradskom-jezeru-pocinje-u-petak

## Annual freshwater species closures (S2 + S3)

North municipalities: Gusinje, Plav, Andrijevica, Berane, Bijelo Polje, Rožaje, Kolašin, Petnjica, Mojkovac, Pljevlja, Žabljak, Šavnik, Plužine, Nikšić.

| Group | Closure |
|---|---|
| All trout | 1 November–15 March |
| Grayling | 1 March–1 June |
| Carp | 1 May–15 June |
| Nase | 15 April–1 June |
| Other cyprinids including chub | 1 May–15 June |

South: Podgorica, Danilovgrad, Bar, Ulcinj and Skadar fishing area.

| Group | Closure |
|---|---|
| Skadar bleak | 15 March–31 October |
| All trout | 1 November–1 April |
| Nase | 15 March–1 June |
| Carp and other cyprinids | 15 March–15 May |
| Shad (kubla) | 1 March–15 May |
| Eel | 1 June–1 December |

S6 primary confirms 2026 carp reopened 16 May, bleak closed through 31 October, eel June–December. Do not apply generic invasive-fish “no closure” advice over all-species park prohibitions.

## Protected species

S2/S3 prohibit catching throughout all freshwater until 1 April 2029: Zeta softmouth trout (Salmothymus zetensis), marble trout (Salmo marmoratus / glavatica), pike (Esox lucius), burbot (Lota lota), huchen/Danube salmon (Hucho hucho / mladica). Accidental catches returned alive. These may be present in habitat lists but must not appear as recommended targets. Some tourism sites still advertise them.

Gaovica (Phoxinus phoxinus) closed in all Nikšić waters; crayfish prohibited in Zeta and Nikšić reservoirs. Carp over 10 kg prohibited in Slano, Liverovići, Krupac, Grahovsko, Bilećko. Show release requirement / don't recommend harvesting.

## Water-specific closures / special regimes

All below S2 unless stated.

| Place | Rule and map handling |
|---|---|
| Rijeka Crnojevića | All species closed from Obodska cave to Gradina/Lisinj until 15 May 2027. Regional marker RED; no route to “fishing spot”. Don't infer whole river boundaries from a town point. |
| Plavnica river; Virpazar canal | Entire course all-species closure until 15 May 2027. RED. Virpazar town can remain tourist/permit information, not fishing point. |
| Skadar named sanctuaries | Until 15 May 2029: Raduš, Karuč, Bjace, Sijerča, Vaškaut, Vranjina–Most Tanki rt, Pančeva oka, Crni žar, Pjavnik, Omerova Gorica, Manastirska tapija, Golubovo ostrvo, Manastirski vrbiš, Grmožur. Mark named prohibited areas, not exact polygon unless independently sourced. |
| Biogradsko Lake | C&R only; park permit, confirm 2026 hours. Amber even in season. |
| Plavsko Lake | Annual all-species closure 1 October–1 April. |
| Ljuča | Annual closure 1 October–1 May, except two named reaches: Cirikače→village stadium Martinovići; Gaz Turkovića→Plav Lake including mouth. Regional mark amber, default closure outside exceptions. |
| Kapetanovo Lake | Annual closure 1 November–1 April. |
| Pivsko Lake | Kosa toward Klačina to Orlovski krš closed 1 November–1 April. Do NOT extend this polygon-less reach ban to entire reservoir. |
| Tara in NP Durmitor | Closed 1 October–1 May. Within NP: Mondays prohibited, other days fishing 14–19 only. Other permanent reach prohibitions also exist. |
| Durmitor lakes | Malo Crno, Zminje, Pošćensko, Valovito, Švablje: prohibited. Do not conflate Veliko Crno with Malo Crno. Zminičko is not Zminje. |
| Crno Lake | Park seasonal opening plus daily restrictions; 2026 reportedly ended 30 September (S9); show confirmation-required for future season. |
| Tara regional reach closures | Ravnjak mouth→Splavišta; Druga Bijela Vrela→Tepca bridge; right bank Splavišta→Sušica mouth and entire Mlinski potok: prohibited. Municipality Kolašin: Žuti Krš new bridge→Val, closure until 1 April 2027. Regional Tara town markers are not proof that city-centre reach is open. |
| Lepešnica, Mojkovac | Only Wednesdays and Fridays 11–18, C&R. |
| Ćehotina, Pljevlja | 1 Jan–1 March closure except Otilovići and Borovica lakes and named fly-fishing reaches. Kozička mouth→Zemunac plus listed tributaries closed 1 Oct–1 May. Additional multi-year urban reaches closed until Apr 2029. |
| Ćehotina, Bijelo Polje | 1 Oct–1 May. |
| Vrbnica / Bukovica, Plužine | All fishing closed until 1 April 2028. |
| Hridsko / Visitorsko lakes | Closed until 1 April 2027. |
| Nikšić sanctuaries | Blato Matanovića, Rastovačka, Gračanica, Bistrica, Perućica spring 250m to Buk, Glibovačko spring, named upper Liverovići part, Zaslapnica: until 1 July 2029. |

Other northern tributary bans exist (Berane, Bijelo Polje, Rožaje, Šavnik); app should say full legal list is broader than plotted places. Entire freshwater national list includes night bans: spring 20–05, summer 21–04, autumn 19–06, winter 17–06, except designated night carp discipline. Month picker is not an hour/day-of-week permission engine.

## Marine parks (PRIMARY S4, p.9–10; current manager links S5)

- Zone II: commercial/recreational floating longlines and hook gear that do not touch seabed or harm bottom habitats, subject permit conditions. Thus recommend checking gear/zone, not generic bottom-fishing in protected zone II.
- Zone III: regulated commercial/recreational fishing allowed until further resource-based restrictions; no assumption that every local point allows all gear.
- Platamuni: Trašte Bay/Cape Žabica→Cape Platamuni near Ploče. Zone II includes Žukovac/Kalafat, Velika Krekavica, in front of Cape Platamuni.
- Katič: Skočiđevojka→Maljevik. Zone II around Katič/Sveta Neđelja islands; south Buljarica offshore and Dubovica/Mravinjak; Perčin→Kotrobanja; Maljevik. Petrovac/Buljarica/Čanj regional markers should show protected-area caution.
- Stari Ulcinj: south Karastanov rt→north Valdanos beach. Zone II includes Stari Ulcinj island/west Hladna uvala/north Kruče; Mavrijan→north Valdanos including Rep/Latova njiva/Udovica/Vučija jama.
- Sopot and Dražin vrt in Boka also listed as protective sites by S5; current precise gear restriction not verified. Mark “protection, confirm local regime”.

## Known conflicts / quality limitations

1. Gov document landing page published May 4 2026 is pre-June order; date alone doesn't mean latest law. https://www.gov.me/en/documents/e22582cd-bcdc-40d1-a953-05431be2c615 . Download link could not be retrieved with web tool, so not used as latest authority.
2. Older FAO and 2020/2021 PDFs have expired ban dates and October–March trout schedule. Current S2/S3 use November–15 March in north. Do not reuse old law merely because search crawl says 2026.
3. Tourism Kolašin page (S11) calls Mladica/glavatica targets and has old quotas. Habitat presence != legal target.
4. Local Rijeka Crnojevića tourism fishing page says spring closure only but omits river-specific multi-year prohibition; do not use as legal authority.
5. A Durmitor.rs page displaying June 2026 says season opens “Sunday 1 May” (calendar mismatch) and hours 08–19 with Monday/Thursday off; clearly recycled. Avoid.
6. Exact boundaries of some bans are written using local place names or annex orthophoto. Do not fabricate a geofence or claim legal precision from a city marker.
