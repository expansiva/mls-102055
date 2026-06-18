/// <mls fileReference="_102055_/l2/molecules/groupnavigatemain/ml-sidebar-nav-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML SIDEBAR NAV — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupNavigateMain
// Herda toda a lógica de MlSidebarNavMolecule (mls-102040): parse de slots
// (Item/Group/Footer), estado de grupos colapsados, handlers de clique/colapso e
// classes de item/ícone. Sobrescreve apenas render() + helpers presentacionais
// (prefixados glass) com classes de vidro. i18n próprio (gMsg) para não depender
// do `msg` privado do pai. This molecule does NOT contain business logic.
import { html, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
// Importar registra a tag do pai (groupnavigatemain--ml-sidebar-nav); inofensivo: usamos a tag -glass.
import { MlSidebarNavMolecule } from '/_102040_/l2/molecules/groupnavigatemain/ml-sidebar-nav.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
  collapse: 'Collapse sidebar',
  expand: 'Expand sidebar',
  navigation: 'Sidebar navigation',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
    collapse: 'Recolher menu',
    expand: 'Expandir menu',
    navigation: 'Menu lateral',
  },
};
/// **collab_i18n_end**

interface NavItem {
  value: string;
  label: string;
  icon: string;
  badge: string | null;
  disabled: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface SidebarNavInternals {
  // estado reativo (@state private no pai)
  collapsedGroups: Set<string>;
  // parsers de slots
  parseTopItems(): NavItem[];
  parseGroups(): NavGroup[];
  parseFooterItems(): NavItem[];
  // handlers
  handleItemClick(item: NavItem): void;
  handleToggleCollapse(): void;
  handleToggleGroup(groupLabel: string): void;
}

@customElement('groupnavigatemain--ml-sidebar-nav-glass')
export class MlSidebarNavGlass extends MlSidebarNavMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): SidebarNavInternals {
    return this as unknown as SidebarNavInternals;
  }

  // ===========================================================================
  // CLASS HELPERS (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassItemClasses(item: NavItem): string {
    const isActive = this.value === item.value;
    const isDisabled = this.disabled || item.disabled;
    return [
      'glass-nav-item',
      'group relative flex w-full items-center gap-3 px-3 py-2 text-sm font-medium',
      isActive ? 'is-active' : '',
      isDisabled ? 'is-disabled' : '',
      this.collapsed ? 'justify-center' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassIconClasses(item: NavItem): string {
    const isActive = this.value === item.value;
    return ['glass-nav-icon flex h-5 w-5 flex-shrink-0 items-center justify-center', isActive ? 'is-active' : '']
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassItemIcon(item: NavItem): TemplateResult {
    if (item.icon) {
      return html`<span class=${this.glassIconClasses(item)}>${unsafeHTML(item.icon)}</span>`;
    }
    const initials = item.label.trim().slice(0, 2).toUpperCase();
    return html`<span class="${this.glassIconClasses(item)} glass-nav-initials rounded-md text-xs font-bold">${initials}</span>`;
  }

  private glassNavItem(item: NavItem): TemplateResult {
    const x = this.x;
    const isActive = this.value === item.value;
    const isDisabled = this.disabled || item.disabled;

    return html`
      <button
        class=${this.glassItemClasses(item)}
        type="button"
        title=${this.collapsed ? item.label : ''}
        aria-current=${isActive ? 'page' : nothing}
        aria-disabled=${isDisabled ? 'true' : 'false'}
        @click=${() => x.handleItemClick(item)}
      >
        ${this.glassItemIcon(item)}
        ${!this.collapsed
          ? html`
              <span class="flex-1 truncate text-left">${item.label}</span>
              ${item.badge ? html`<span class="glass-nav-badge ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold">${item.badge}</span>` : nothing}
            `
          : html`${item.badge ? html`<span class="glass-nav-dot absolute right-1.5 top-1.5 h-2 w-2 rounded-full"></span>` : nothing}`}
      </button>
    `;
  }

  private glassGroup(group: NavGroup): TemplateResult {
    const x = this.x;
    if (this.collapsed) {
      return html`
        <div class="space-y-1">
          <div class="glass-sidebar-divider mx-3 my-2 h-px"></div>
          ${group.items.map((item) => this.glassNavItem(item))}
        </div>
      `;
    }

    const isGroupCollapsed = x.collapsedGroups.has(group.label);

    return html`
      <div class="space-y-1">
        ${group.label
          ? html`
              <button class="glass-group-label flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider" type="button" @click=${() => x.handleToggleGroup(group.label)}>
                <span class="truncate">${group.label}</span>
                <svg class="ml-2 h-3 w-3 flex-shrink-0 transition-transform ${isGroupCollapsed ? '' : 'rotate-90'}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </button>
              ${!isGroupCollapsed ? html`<div class="space-y-1">${group.items.map((item) => this.glassNavItem(item))}</div>` : nothing}
            `
          : html`<div class="space-y-1">${group.items.map((item) => this.glassNavItem(item))}</div>`}
      </div>
    `;
  }

  private glassCollapseToggle(): TemplateResult {
    const x = this.x;
    return html`
      <button class="glass-collapse-btn flex items-center justify-center rounded-lg p-1.5" type="button" aria-label=${this.collapsed ? this.gMsg.expand : this.gMsg.collapse} @click=${() => x.handleToggleCollapse()}>
        <svg class="h-4 w-4 transition-transform ${this.collapsed ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    `;
  }

  private glassLoading(): TemplateResult {
    return html`
      <div class="space-y-1 animate-pulse">
        ${[1, 2, 3, 4].map(
          () => html`
            <div class="flex items-center gap-3 rounded-lg px-3 py-2">
              <div class="glass-skeleton h-5 w-5 flex-shrink-0 rounded"></div>
              ${!this.collapsed ? html`<div class="glass-skeleton h-3 w-28 rounded"></div>` : nothing}
            </div>
          `
        )}
        <div class="glass-sidebar-divider mx-3 my-3 h-px"></div>
        ${[1, 2].map(
          () => html`
            <div class="flex items-center gap-3 rounded-lg px-3 py-2">
              <div class="glass-skeleton h-5 w-5 flex-shrink-0 rounded"></div>
              ${!this.collapsed ? html`<div class="glass-skeleton h-3 w-20 rounded"></div>` : nothing}
            </div>
          `
        )}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — parse/estado/handlers herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    const labelContent = this.hasSlot('Label') ? this.getSlotContent('Label') : '';
    const topItems = x.parseTopItems();
    const groups = x.parseGroups();
    const footerItems = x.parseFooterItems();

    const sidebarWidth = this.collapsed ? 'w-16' : 'w-64';

    return html`
      <nav class="glass-sidebar ${sidebarWidth} flex h-full flex-col overflow-hidden transition-all duration-200" aria-label=${labelContent || this.gMsg.navigation}>
        <div class="glass-sidebar-header flex min-h-[56px] items-center justify-between px-3 py-3">
          ${!this.collapsed && labelContent ? html`<span class="glass-sidebar-title truncate text-sm font-semibold">${unsafeHTML(labelContent)}</span>` : html`<span></span>`}
          ${this.glassCollapseToggle()}
        </div>

        <div class="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          ${this.loading ? this.glassLoading() : html` ${topItems.map((item) => this.glassNavItem(item))} ${groups.map((group) => this.glassGroup(group))} `}
        </div>

        ${footerItems.length > 0
          ? html`<div class="glass-sidebar-footer px-2 py-3 space-y-1">${footerItems.map((item) => this.glassNavItem(item))}</div>`
          : nothing}
      </nav>
    `;
  }
}
