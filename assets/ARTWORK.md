# Fish atlas plate

Generated using the built-in image_gen tool on 2026-10-27. Project-bound original PNG, 1086 × 1448, alpha channel. AI illustrations are decorative and are not a reliable species identification key.

Source: `fish-plate.png`.

The plate contains all 12 requested species in 3 columns and 4 rows. Rows are not at exactly equal vertical centers, so use the per-specimen SVG viewBox crops below rather than a uniform CSS background grid. These crop the display only; no pixel manipulation or separate crop assets are needed. A map marker may embed a data-URI SVG with the same viewBox and an `<image>` pointing to the plate, or use an HTML element containing the SVG.

```html
<svg viewBox="0 170 363 250" role="img" aria-label="Дорада">
  <image href="assets/fish-plate.png" width="1086" height="1448" />
</svg>
```

| ID | English | Latin | ViewBox |
|---|---|---|---|
| dorada | Gilthead seabream | Sparus aurata | 0 170 363 250 |
| seabass | European seabass | Dicentrarchus labrax | 363 170 363 250 |
| mullet | Flathead grey mullet | Mugil cephalus | 726 170 360 250 |
| sarg | White seabream | Diplodus sargus | 0 475 363 255 |
| garfish | Garfish | Belone belone | 363 475 363 255 |
| horse-mackerel | Atlantic horse mackerel | Trachurus trachurus | 726 475 360 255 |
| trout | Brown trout | Salmo trutta | 0 780 363 255 |
| grayling | European grayling | Thymallus thymallus | 363 780 363 255 |
| carp | Common carp | Cyprinus carpio | 726 780 360 255 |
| crucian | Silver crucian carp | Carassius gibelio | 0 1080 363 265 |
| perch | European perch | Perca fluviatilis | 363 1080 363 265 |
| chub | European chub | Squalius cephalus | 726 1080 360 265 |

## Prompt

Use case: scientific-educational. Asset type: a single fish specimen atlas plate / sprite sheet for a fishing map website. Create EXACTLY TWELVE distinct isolated side-view fish specimens arranged in a mathematically strict THREE COLUMNS by FOUR ROWS equal-cell grid. Every fish horizontal, head left, centered in its own cell with generous empty transparent margins; fish must never overlap cell boundaries or each other. All columns and rows evenly spaced. The whole image should have aspect ratio 3:4, e.g. 1536x2048. Row-major species order: row 1 = gilthead seabream (Sparus aurata, deep oval body gold band forehead), European seabass (Dicentrarchus labrax, elongated silver fish two dorsal fins), flathead grey mullet (Mugil cephalus, blunt head thick lips grey striped body). Row 2 = white seabream (Diplodus sargus, deep oval with thin vertical dark bars and black tail base), garfish (Belone belone, very long narrow body and long beak jaws), Atlantic horse mackerel (Trachurus trachurus, silvery tapered fish dark lateral scutes and large eye). Row 3 = brown trout (Salmo trutta, brown golden body with black and red spots), European grayling (Thymallus thymallus, unmistakable tall sail-shaped dorsal fin), common carp (Cyprinus carpio, deep golden body large scales and barbels). Row 4 = silver crucian carp (Carassius gibelio, deep silver body no barbels), European perch (Perca fluviatilis, dark vertical bars and orange red lower fins), European chub (Squalius cephalus, elongated robust silver body, big scales rounded head and reddish lower fins). Style: refined late nineteenth-century zoological field-guide ink engraving, dark sepia etched contour lines, fine cross hatching, restrained muted natural watercolor tint, weathered western naturalist journal atmosphere reminiscent of Red Dead Redemption 2 field drawings. Biologically recognizable proportions and fins, elegant mature illustrative finish. Background MUST be genuinely transparent alpha, no paper, no checkerboard painted background, no frame. NO TEXT, NO LETTERS, NO NUMBERS, NO LABELS, NO extra animals, NO title, NO visible grid lines, NO watermark.


