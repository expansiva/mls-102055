/// <mls fileReference="_102055_/l2/molecules/groupenternumber/ml-range-slider-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RANGE SLIDER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterNumber
// Herda RangeSliderMolecule (mls-102040): dual-range, clampPair, bounds, formatação,
// estado. Sobrescreve só render().
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { RangeSliderMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-range-slider.js';

/// **collab_i18n_start**
const message_en = { placeholder: 'Select a range', empty: '—', loading: 'Loading...', rangeSeparator: '–' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { placeholder: 'Selecione um intervalo', empty: '—', loading: 'Carregando...', rangeSeparator: '–' },
};
/// **collab_i18n_end**

interface RangeSliderInternals {
  handleLowInput(e: Event): void;
  handleHighInput(e: Event): void;
  handleLowChange(): void;
  handleHighChange(): void;
  handleFocus(): void;
  handleBlur(): void;
  getBounds(): { min: number; max: number };
  getValueDisplay(): { low: string; high: string };
  isIntervalUnset(): boolean;
}

@customElement('groupenternumber--ml-range-slider-glass')
export class RangeSliderGlass extends RangeSliderMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `rs-glass-${Math.random().toString(36).slice(2, 8)}`;
  private get gLabelId() { return `${this.gUid}-label`; }
  private get gErrorId() { return `${this.gUid}-error`; }
  private get gHelperId() { return `${this.gUid}-helper`; }

  private get x(): RangeSliderInternals {
    return this as unknown as RangeSliderInternals;
  }

  private glassInputClasses(): string {
    return [
      'glass-range w-full',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<label id=${this.gLabelId} class="glass-rs-label mb-1 text-sm font-medium">${unsafeHTML(this.getSlotContent('Label'))}</label>`;
  }
  private glassPrefixSuffix(content: string): TemplateResult {
    const prefix = this.hasSlot('Prefix') ? unsafeHTML(this.getSlotContent('Prefix')) : null;
    const suffix = this.hasSlot('Suffix') ? unsafeHTML(this.getSlotContent('Suffix')) : null;
    return html`
      <span class="inline-flex items-center gap-1">
        ${prefix ? html`<span class="glass-rs-affix">${prefix}</span>` : html``}
        <span class="glass-rs-value">${content}</span>
        ${suffix ? html`<span class="glass-rs-affix">${suffix}</span>` : html``}
      </span>
    `;
  }
  private glassHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id=${this.gErrorId} class="glass-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id=${this.gHelperId} class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private glassLoading(): TemplateResult {
    if (!this.loading) return html``;
    return html`<div class="glass-rs-loading mt-2 text-xs">${this.gMsg.loading}</div>`;
  }

  private glassEditMode(): TemplateResult {
    const { min, max } = this.x.getBounds();
    const display = this.x.getValueDisplay();
    const ariaDescribedBy = this.error ? this.gErrorId : this.hasSlot('Helper') ? this.gHelperId : undefined;
    const ariaLabelledBy = this.hasSlot('Label') ? this.gLabelId : undefined;

    return html`
      <div class="flex flex-col">
        ${this.glassLabel()}
        <div class="glass-rs-row mb-2 flex items-center justify-between text-sm">
          ${this.glassPrefixSuffix(display.low)}
          <span class="glass-rs-sep">${this.gMsg.rangeSeparator}</span>
          ${this.glassPrefixSuffix(display.high)}
        </div>
        <div class="grid gap-3">
          <input
            type="range"
            class=${this.glassInputClasses()}
            min=${min}
            max=${max}
            step=${this.step}
            .value=${String(this.value ?? min)}
            aria-labelledby=${ariaLabelledBy || ''}
            aria-describedby=${ariaDescribedBy || ''}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-valuemin=${min}
            aria-valuemax=${max}
            aria-valuenow=${this.value ?? min}
            aria-readonly=${this.readonly ? 'true' : 'false'}
            ?disabled=${this.disabled || this.loading}
            @input=${(e: Event) => this.x.handleLowInput(e)}
            @change=${() => this.x.handleLowChange()}
            @focus=${() => this.x.handleFocus()}
            @blur=${() => this.x.handleBlur()}
          />
          <input
            type="range"
            class=${this.glassInputClasses()}
            min=${min}
            max=${max}
            step=${this.step}
            .value=${String(this.valueHigh ?? max)}
            aria-labelledby=${ariaLabelledBy || ''}
            aria-describedby=${ariaDescribedBy || ''}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-valuemin=${min}
            aria-valuemax=${max}
            aria-valuenow=${this.valueHigh ?? max}
            aria-readonly=${this.readonly ? 'true' : 'false'}
            ?disabled=${this.disabled || this.loading}
            @input=${(e: Event) => this.x.handleHighInput(e)}
            @change=${() => this.x.handleHighChange()}
            @focus=${() => this.x.handleFocus()}
            @blur=${() => this.x.handleBlur()}
          />
        </div>
        ${this.glassHelperOrError()} ${this.glassLoading()}
      </div>
    `;
  }

  private glassViewMode(): TemplateResult {
    const display = this.x.getValueDisplay();
    const content = this.x.isIntervalUnset() ? this.gMsg.empty : `${display.low} ${this.gMsg.rangeSeparator} ${display.high}`;
    return html`
      <div class="flex flex-col">${this.glassLabel()}<div class="glass-rs-view text-sm">${this.glassPrefixSuffix(content)}</div></div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    if (!this.isEditing) return this.glassViewMode();
    return this.glassEditMode();
  }
}
