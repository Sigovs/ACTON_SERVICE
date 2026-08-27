import { FOOTER_QUICK_LINKS, FOOTER_SERVICES, type PageKey } from "./site-nav";
import { navLink } from "./site-links";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

const CDN = "https://www.actonautowerks.com/wp-content/uploads";
const PHONE_DISPLAY = "(978) 429-8913";
const PHONE_HREF = "tel:+19784298913";
const EMAIL = "service@actonautowerks.com";
const ADDRESS = "429 Great Rd, Acton, MA 01720";
const MAPS = "https://maps.app.goo.gl/Rsuie6ei9bPKs1Gm8";

/** Shared across every service page; active state is resolved per page. */
export default function SiteFooter({ current }: { current: PageKey }) {
  return (
    <footer className="aaw-footer">
          <div className="aaw-shell aaw-footer-grid">
            <div className="aaw-footer-col aaw-footer-col--brand">
              <a href="https://www.actonautowerks.com/" aria-label="Acton Autowerks home">
                <img
                  src={`${CDN}/2025/07/site-logo.png`}
                  alt="Acton Autowerks"
                  width={112}
                  height={39}
                  loading="lazy"
                />
              </a>
              <p>
                Your one-stop destination for trusted automotive care, performance
                upgrades, and protection that keeps every vehicle in its best
                shape.
              </p>
              <div className="aaw-footer-social">
                <a
                  href="https://www.facebook.com/ActonAutoWerks/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Acton Autowerks on Facebook"
                >
                  <FacebookIcon size={21} />
                </a>
                <a
                  href="https://www.instagram.com/acton_autowerks/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Acton Autowerks on Instagram"
                >
                  <InstagramIcon size={21} />
                </a>
              </div>
            </div>
  
            <div className="aaw-footer-col">
              <p className="aaw-footer-title">Services</p>
              <ul className="aaw-footer-links">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.label}>
                    <a {...navLink(item, current)} aria-current={item.key === current ? "page" : undefined}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="aaw-footer-col">
              <p className="aaw-footer-title">Quick Links</p>
              <ul className="aaw-footer-links">
                {FOOTER_QUICK_LINKS.map((item) => (
                  <li key={item.label}>
                    <a {...navLink(item, current)}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="aaw-footer-col">
              <p className="aaw-footer-title">Contact Us</p>
              <ul className="aaw-footer-contact">
                <li>
                  <a href={`mailto:${EMAIL}`}>
                    <MailIcon size={18} />
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a href={PHONE_HREF}>
                    <PhoneIcon size={18} />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={MAPS} target="_blank" rel="noreferrer">
                    <PinIcon size={14} />
                    {ADDRESS}
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="aaw-footer-bar">
            <div className="aaw-shell">
              <p>
                Copyright &copy; 2026 <b>Acton Autowerks</b>. All rights reserved
              </p>
              <p>
                <a href="https://www.actonautowerks.com/privacy-policy/">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </footer>
  );
}
