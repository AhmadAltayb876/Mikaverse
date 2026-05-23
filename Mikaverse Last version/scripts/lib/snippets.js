/** Shared HTML fragments for generators */

const WHATSAPP_URL = "https://wa.me/963939327169";

/** Fixed bottom-left (listing pages and general pages) */
const WHATSAPP_FAB = `    <a class="whatsapp-fab glass-panel float-anim" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">
        <i class="fab fa-whatsapp"></i>
    </a>`;

/** Inside project detail sidebar — bottom-left of sidebar */
const WHATSAPP_FAB_SIDEBAR = `            <a class="whatsapp-fab whatsapp-fab--sidebar glass-panel float-anim" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">
                <i class="fab fa-whatsapp"></i>
            </a>`;

module.exports = { WHATSAPP_URL, WHATSAPP_FAB, WHATSAPP_FAB_SIDEBAR };
