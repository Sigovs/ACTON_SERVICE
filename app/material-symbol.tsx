/**
 * The page's single icon primitive.
 *
 * Google Material Symbols Sharp, FILL 0 / wght 400 / GRAD 0 / opsz 40, drawn in
 * Acton teal at a consistent weight. Every name here is verified to resolve to
 * a real subsetted glyph — Google serves the full 659KB face with a
 * `/* fallback *​/` marker when a name does not exist, so an unverified name
 * would silently bloat the page and render tofu.
 *
 * These names must stay in sync with the `icon_names` list in layout.tsx.
 */
export const SYMBOLS = {
  tireReplacement: "tire_repair",
  mountingBalancing: "settings",
  tireRepair: "build_circle",
  wheelAlignment: "align_horizontal_center",
  summer: "sunny",
  allSeason: "partly_cloudy_day",
  winter: "ac_unit",
  disclosure: "keyboard_arrow_down",
  /* Maintenance & Service Intervals */
  oil: "oil_barrel",
  tuneUp: "build",
  fluid: "water_drop",
  filter: "filter_alt",
  battery: "battery_charging_full",
  spark: "bolt",
  diagnostics: "troubleshoot",
  wiper: "cleaning_services",
  fleet: "local_shipping",
  faq: "help_center",
  /* Electrical Systems */
  audio: "graphic_eq",
  gauge: "speed",
  software: "system_update",
  /* Auto Body */
  dentRemoval: "healing",
  rustPrevention: "shield",
  undercoating: "layers",
} as const;

export type SymbolName = (typeof SYMBOLS)[keyof typeof SYMBOLS];

type Props = {
  /** A verified Material Symbols Sharp ligature name. */
  name: SymbolName;
  /** `pale` on light bands, `plain` on cards, `ledger` on the teal band. */
  tone?: "pale" | "plain" | "ledger";
};

export function MaterialSymbol({ name, tone = "pale" }: Props) {
  return (
    <span className="aaw-symbol" data-tone={tone} aria-hidden="true">
      <span className="material-symbols-sharp">{name}</span>
    </span>
  );
}
