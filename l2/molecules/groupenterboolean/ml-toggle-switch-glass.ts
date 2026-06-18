/// <mls fileReference="_102055_/l2/molecules/groupenterboolean/ml-toggle-switch-glass.ts" enhancement="_102020_/l2/enhancementAura" />
// =============================================================================
// TOGGLE SWITCH — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterBoolean
// Herda toda a lógica de ToggleSwitchMolecule (mls-102040) e sobrescreve apenas
// o render() com o template de vidro. Aparência no .less escopado na tag -glass.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupenterboolean--ml-toggle-switch); inofensivo: usamos a tag -glass.
import { ToggleSwitchMolecule } from '/_102040_/l2/molecules/groupenterboolean/ml-toggle-switch.js';

/// **collab_i18n_start**
const message_en = { yes: 'Yes', no: 'No' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { yes: 'Sim', no: 'Não' },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype (private de TS é apagado); o cast preserva o tipo onde acessamos.
interface ToggleSwitchInternals {
  handleToggle(): void;
  handleFocus(): void;
  handleBlur(): void;
  handleKeydown(event: KeyboardEvent): void;
}

@customElement('groupenterboolean--ml-toggle-switch-glass')
export class ToggleSwitchGlass extends ToggleSwitchMolecule {
  // i18n e id próprios (não reaproveita os `private` do pai para evitar conflito de nome)
  private gMsg: MessageType = messages.en;
  private gUid = `tg-glass-${Math.random().toString(36).slice(2, 9)}`;

  private get internals(): ToggleSwitchInternals {
    return this as unknown as ToggleSwitchInternals;
  }

  // ===========================================================================
  // RENDER HELPERS (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassLabel(labelId: string | undefined): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div id=${labelId || ''} class="glass-tg-label mb-2 text-sm font-medium">
      ${unsafeHTML(this.getSlotContent('Label'))}
    </div>`;
  }

  private glassHelper(helperId: string | undefined): TemplateResult {
    if (!this.hasSlot('Helper') || this.error) return html``;
    return html`<div id=${helperId || ''} class="glass-helper mt-2 text-xs">
      ${unsafeHTML(this.getSlotContent('Helper'))}
    </div>`;
  }

  private glassError(errorId: string | undefined): TemplateResult {
    if (!this.error) return html``;
    return html`<div id=${errorId || ''} class="glass-error-text mt-2 text-xs">
      ${unsafeHTML(String(this.error))}
    </div>`;
  }

  private glassTrackClasses(): string {
    return [
      'glass-tg-track relative inline-flex h-6 w-11 items-center',
      this.value ? 'is-on' : '',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassThumbClasses(): string {
    return ['glass-tg-thumb inline-block h-4 w-4', this.value ? 'is-on' : ''].filter(Boolean).join(' ');
  }

  private glassViewMode(): TemplateResult {
    const labelId = this.hasSlot('Label') ? `${this.gUid}-label` : undefined;
    const viewValue = this.value ? this.gMsg.yes : this.gMsg.no;
    return html`
      <div class="w-full">
        ${this.glassLabel(labelId)}
        <div class="glass-tg-view text-sm">${viewValue}</div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.internals
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) {
      return this.glassViewMode();
    }

    const labelId = this.hasSlot('Label') ? `${this.gUid}-label` : undefined;
    const helperId = this.hasSlot('Helper') ? `${this.gUid}-helper` : undefined;
    const errorId = this.error ? `${this.gUid}-error` : undefined;
    const describedBy = this.error ? errorId : helperId;
    const self = this.internals;

    return html`
      <div class="w-full">
        ${this.glassLabel(labelId)}
        <button
          type="button"
          class=${this.glassTrackClasses()}
          role="switch"
          aria-checked=${this.value ? 'true' : 'false'}
          aria-labelledby=${labelId || undefined}
          aria-describedby=${describedBy || undefined}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ?disabled=${this.disabled}
          tabindex=${this.disabled ? -1 : 0}
          @click=${() => self.handleToggle()}
          @focus=${() => self.handleFocus()}
          @blur=${() => self.handleBlur()}
          @keydown=${(e: KeyboardEvent) => self.handleKeydown(e)}
        >
          <span class=${this.glassThumbClasses()}></span>
        </button>
        ${this.glassError(errorId)}
        ${this.glassHelper(helperId)}
      </div>
    `;
  }
}
