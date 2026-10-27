# Источники оформления и лицензии

- **Leaflet 1.9.4**, BSD-2-Clause: [leafletjs.com](https://leafletjs.com/), лицензия в `vendor/leaflet/LICENSE`.
- **Leaflet.markercluster 1.5.3**, MIT: [репозиторий](https://github.com/Leaflet/Leaflet.markercluster), лицензия в `vendor/markercluster/LICENSE`.
- **Roboto Slab**, Apache License 2.0: Google Fonts, лицензия в `assets/FONT-LICENSE.txt`. Шрифт хранится локально.
- **OpenStreetMap**: © OpenStreetMap contributors, ODbL. [Условия и атрибуция](https://www.openstreetmap.org/copyright), [политика тайлов](https://operations.osmfoundation.org/policies/tiles/). Авторство показано на карте. Тайлы требуют сети и не входят в архив.
- **Natural Earth**: [общественное достояние](https://www.naturalearthdata.com/about/terms-of-use/). География стран — 1:10m, выбранные реки/озёра — 1:10m; источник [natural-earth-vector](https://github.com/nvkelso/natural-earth-vector). Резервная основа обобщена и не предназначена для навигации.
- **GeoNames**: координаты населённых пунктов и водоёмов, [CC BY 4.0](https://www.geonames.org/about.html), [выгрузка Черногории](https://download.geonames.org/export/dump/ME.zip). Координаты не означают точку разрешённого доступа или заброса.
- **Гравюры рыб**: созданы встроенным `image_gen` 27.10.2026. Локальный оригинал `assets/fish-plate.png`; полный промпт в `assets/ARTWORK.md`. Художественные изображения, не определитель видов. Обрезка отображения выполняется SVG clipPath, исходный PNG сохранён без изменения пикселей.
- **Стилистика**: оригинальная интерпретация старого полевого атласа в атмосфере RDR2. Игровые карты, логотипы, шрифты и графические материалы Rockstar не копировались.

Фактические материалы пересказаны кратко; ссылки и уровни источников находятся в `data.js`, карточках и исследовательских заметках. Правила приведены как исследовательская сводка на указанную дату, не как постоянно обновляемый юридический сервис.

## Рисованная подложка версии 1.1

- Линии дорог, русла рек и контуры водоёмов: © OpenStreetMap contributors, [выгрузка Geofabrik для Черногории](https://download.geofabrik.de/europe/montenegro.html), получена 27.10.2026. Производная географическая база `assets/drawn-geography.js` в части OSM распространяется на условиях [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Геометрия упрощена для художественного атласа, без изменения расположения водоёмов и дорог.
- Рельеф: [Terrain Tiles / Mapzen](https://registry.opendata.aws/terrain-tiles/), получен 27.10.2026. Terrarium RGB декодирован в высоты, усреднён по 2×2 отсчётам уровня 8; рассчитаны горизонтали с интервалом 200 м. Контуры дополнительно обобщены. Это визуализация, не точный набор высот для навигации.
- Europe terrain data produced using Copernicus data and information funded by the European Union — EU-DEM layers. Global GMTED2010 and SRTM terrain data courtesy of the U.S. Geological Survey. [Условия и атрибуция Terrain Tiles](https://github.com/tilezen/joerd/blob/master/docs/attribution.md).
- Шрифты **Caveat** и **Oswald**, SIL Open Font License 1.1: локальные файлы и лицензии `assets/CAVEAT-LICENSE.txt`, `assets/OSWALD-LICENSE.txt`.
- Оригинальная бумажная текстура `assets/paper-rdr.png`: создана встроенным `image_gen`. Описание и промпт — `assets/PAPER-ARTWORK.md`.
- Референсы изучались визуально: [крупный фрагмент карты Strawberry](https://github.com/jeanropke/RDR2CollectorsMap/issues/695), [полная внутриигровая карта](https://www.powerpyx.com/red-dead-redemption-2-full-world-map-revealed/). Игровые изображения не включены в сайт и не используются как подложка.

## Карандашные рыбы версии 1.2

Текущие 12 изображений `assets/fish-sketches.png` созданы встроенным `image_gen` на основе исходной таблицы рыб, с сохранением состава и общей компоновки. Полный промпт — в `assets/FISH-SKETCHES.md`. Новые иллюстрации подключены на карте, в каталоге и карточках. Это художественная стилизация, не определитель видов. Семь дополнительных рисунков в `assets/fish-sketches-extra.png` созданы встроенным `image_gen` в той же карандашной манере; теперь иллюстрированы все 19 видов и групп.
