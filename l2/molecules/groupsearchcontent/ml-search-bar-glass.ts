/// <mls fileReference="_102055_/l2/molecules/groupsearchcontent/ml-search-bar-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML SEARCH BAR — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSearchContent
// Herda MlSearchBarMolecule (mls-102040): debounce, eventos search/change/clear,
// navegação por teclado, estado (query/isOpen/highlightIndex), sugestões via slot.
// Sobrescreve apenas render() + helpers presentacionais com classes glass.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupsearchcontent--ml-search-bar); inofensivo: usamos a tag -glass.
import { MlSearchBarMolecule } from '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Search',
  loading: 'Loading...',
  noResults: 'No results found',
  clear: 'Clear search',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

type SuggestionItem = {
  value: string;
  labelHtml: string;
  labelText: string;
};

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância/prototype (private de TS é apagado); o cast preserva o tipo.
interface SearchBarInternals {
  // estado reativo (@state private no pai)
  query: string;
  isOpen: boolean;
  highlightIndex: number;
  // handlers
  handleInput(e: Event): void;
  handleFocus(): void;
  handleBlur(): void;
  handleKeyDown(e: KeyboardEvent): void;
  handleClearClick(): void;
  handleSuggestionClick(index: number): void;
  // dados
  getSuggestions(): SuggestionItem[];
}

@customElement('groupsearchcontent--ml-search-bar-glass')
export class MlSearchBarGlass extends MlSearchBarMolecule {
  private gMsg: MessageType = messages.en;
  private gComponentId = `ml-search-bar-glass-${Math.random().toString(36).slice(2)}`;

  private get x(): SearchBarInternals {
    return this as unknown as SearchBarInternals;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassInputClasses(): string {
    return [
      'glass-sb-input w-full pl-10 pr-10 py-2 text-sm',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassPanelClasses(): string {
    return [
      'glass-sb-panel mt-2 p-2 space-y-1',
      this.x.isOpen ? 'block' : 'hidden',
    ].filter(Boolean).join(' ');
  }

  private glassSuggestionClasses(isActive: boolean): string {
    return [
      'glass-sb-option w-full text-left px-3 py-2 text-sm',
      isActive ? 'is-active' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelId = `${this.gComponentId}-label`;
    return html`
      <label id=${labelId} class="glass-sb-label block mb-1 text-sm">
        ${unsafeHTML(this.getSlotContent('Label'))}
      </label>
    `;
  }

  private glassHelperOrError(): TemplateResult {
    if (this.error) {
      const errorId = `${this.gComponentId}-error`;
      return html`<p id=${errorId} class="glass-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      const helperId = `${this.gComponentId}-helper`;
      return html`<p id=${helperId} class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }

  private glassSuggestions(): TemplateResult {
    const x = this.x;
    const suggestions = x.getSuggestions();
    const hasSuggestions = suggestions.length > 0;
    const showEmpty = !this.loading && !hasSuggestions && x.query;

    return html`
      <div id=${`${this.gComponentId}-list`} class=${this.glassPanelClasses()} role="listbox">
        ${this.loading ? html`
          <div class="glass-sb-muted px-3 py-2 text-sm">
            ${this.gMsg.loading}
          </div>
        ` : html``}
        ${hasSuggestions ? suggestions.map((item, index) => html`
          <button
            class=${this.glassSuggestionClasses(index === x.highlightIndex)}
            role="option"
            aria-selected=${index === x.highlightIndex}
            ?disabled=${this.disabled}
            @mousedown=${(e: Event) => e.preventDefault()}
            @click=${() => x.handleSuggestionClick(index)}
          >
            ${unsafeHTML(item.labelHtml)}
          </button>
        `) : html``}
        ${showEmpty ? html`
          <div class="glass-sb-muted px-3 py-2 text-sm">
            ${unsafeHTML(this.getSlotContent('Empty') || this.gMsg.noResults)}
          </div>
        ` : html``}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    const labelId = this.hasSlot('Label') ? `${this.gComponentId}-label` : undefined;
    const errorId = this.error ? `${this.gComponentId}-error` : undefined;
    const helperId = !this.error && this.hasSlot('Helper') ? `${this.gComponentId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
    const inputPlaceholder = this.placeholder || this.gMsg.placeholder;
    const showClear = !!x.query && !this.disabled;

    return html`
      <div class="w-full">
        ${this.glassLabel()}
        <div class="relative">
          <span class="glass-sb-icon absolute left-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              ${svg`<path d="M10.5 3a7.5 7.5 0 1 1-4.24 13.68l-3.97 3.97a1 1 0 1 1-1.42-1.42l3.97-3.97A7.5 7.5 0 0 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" fill="currentColor" />`}
            </svg>
          </span>
          <input
            class=${this.glassInputClasses()}
            type="text"
            name=${this.name}
            .placeholder=${inputPlaceholder}
            .value=${x.query}
            ?disabled=${this.disabled}
            role="combobox"
            aria-expanded=${x.isOpen}
            aria-autocomplete="list"
            aria-controls=${`${this.gComponentId}-list`}
            aria-labelledby=${labelId || ''}
            aria-describedby=${describedBy || ''}
            aria-invalid=${this.error ? 'true' : 'false'}
            @input=${(e: Event) => x.handleInput(e)}
            @focus=${() => x.handleFocus()}
            @blur=${() => x.handleBlur()}
            @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e)}
          />
          ${showClear ? html`
            <button
              class="glass-sb-clear absolute right-3 top-1/2 -translate-y-1/2"
              aria-label=${this.gMsg.clear}
              @mousedown=${(e: Event) => e.preventDefault()}
              @click=${() => x.handleClearClick()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                ${svg`<path d="M6.7 5.3a1 1 0 0 1 1.4 0L12 9.17l3.9-3.88a1 1 0 1 1 1.4 1.42L13.42 10.6l3.88 3.9a1 1 0 0 1-1.42 1.4L12 12.02l-3.9 3.88a1 1 0 1 1-1.4-1.42l3.88-3.9-3.88-3.88a1 1 0 0 1 0-1.4z" fill="currentColor" />`}
              </svg>
            </button>
          ` : html``}
        </div>
        ${this.glassSuggestions()}
        ${this.glassHelperOrError()}
      </div>
    `;
  }
}
