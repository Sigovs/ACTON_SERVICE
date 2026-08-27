import type { Metadata } from "next";
import "./globals.css";

/* Only the symbols the pages actually use — a small subset instead of the
   659KB full face. display=block keeps the ligature text from ever flashing. */
const MATERIAL_SYMBOLS =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@40,400,0,0" +
  "&icon_names=ac_unit,align_horizontal_center,battery_charging_full,bolt,build,build_circle,cleaning_services,filter_alt,graphic_eq,healing,help_center,keyboard_arrow_down,layers,local_shipping,oil_barrel,partly_cloudy_day,settings,shield,speed,sunny,system_update,tire_repair,troubleshoot,water_drop&display=block";

/**
 * Runs before first paint.
 *
 * `data-motion` arms the scroll reveals only when scripting is available, so
 * with JS off the images simply render in place instead of staying invisible.
 * `data-icons` is set once the symbol font is genuinely ready; until then the
 * glyph spans stay hidden, so a failed font shows nothing rather than the
 * ligature name as words.
 */
const BOOT = `
document.documentElement.dataset.motion = "on";
if (document.fonts && document.fonts.load) {
  document.fonts.load('40px "Material Symbols Sharp"').then(function () {
    if (document.fonts.check('40px "Material Symbols Sharp"')) {
      document.documentElement.dataset.icons = "ready";
    }
  }).catch(function () {});
}
`;

/* Page titles live on each route; only the icon is shared. */
export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={MATERIAL_SYMBOLS} />
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
