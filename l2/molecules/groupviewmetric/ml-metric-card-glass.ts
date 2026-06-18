/// <mls fileReference="_102055_/l2/molecules/groupviewmetric/ml-metric-card-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC CARD — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupViewMetric
// Herda MetricCardMolecule (mls-102040): contrato/slots/loading intactos.
// Sobrescreve só render() + helpers presentacionais (glass). Display-only.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetricCardMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';

@customElement('groupviewmetric--ml-metric-card-glass')
export class MetricCardGlass extends MetricCardMolecule {
  // ---- helpers presentacionais (glass) — nomes próprios p/ não colidir com os private do pai ----
  private glassBaseClasses(): string {
    return 'glass-mc w-full p-4';
  }

  private glassLabelClasses(): string {
    return 'glass-mc-label text-sm font-medium';
  }

  private glassValueClasses(): string {
    return 'glass-mc-value text-3xl font-semibold tracking-tight';
  }

  private glassHelperClasses(): string {
    return 'glass-mc-helper text-xs';
  }

  private glassTrendClasses(direction: string | null): string {
    const dir = direction === 'up' ? 'is-up' : direction === 'down' ? 'is-down' : 'is-neutral';
    return `glass-mc-trend ${dir} inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium`;
  }

  private glassAriaLabelFromHtml(content: string): string {
    if (!content) return '';
    return content.replace(/<[^>]*>/g, '').trim();
  }

  private glassIcon(): TemplateResult {
    if (!this.hasSlot('Icon')) return html``;
    return html`
      <div class="glass-mc-icon flex items-center justify-center p-2">
        <span>${unsafeHTML(this.getSlotContent('Icon'))}</span>
      </div>
    `;
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="${this.glassLabelClasses()}">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private glassValue(): TemplateResult {
    return html`<div class="${this.glassValueClasses()}" aria-live="polite">${unsafeHTML(this.getSlotContent('Value'))}</div>`;
  }

  private glassTrend(): TemplateResult {
    if (!this.hasSlot('Trend')) return html``;
    const direction = this.getSlotAttr('Trend', 'direction');
    const aria = direction ? `Trend: ${direction}` : '';
    return html`<div class="${this.glassTrendClasses(direction)}" aria-label=${aria}>${unsafeHTML(this.getSlotContent('Trend'))}</div>`;
  }

  private glassHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    return html`<div class="${this.glassHelperClasses()}">${unsafeHTML(this.getSlotContent('Helper'))}</div>`;
  }

  private glassSkeleton(): TemplateResult {
    const block = 'glass-mc-skel';
    return html`
      <div class="flex items-start gap-3">
        <div class="h-10 w-10 ${block}"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 w-1/2 ${block}"></div>
          <div class="h-8 w-2/3 ${block}"></div>
          <div class="h-4 w-1/3 ${block}"></div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — contrato/slots/loading herdados
  // ===========================================================================
  render() {
    const labelContent = this.getSlotContent('Label');
    const ariaLabel = this.glassAriaLabelFromHtml(labelContent);

    return html`
      <div class="${this.glassBaseClasses()}" role="figure" aria-label=${ariaLabel}>
        ${this.loading
          ? this.glassSkeleton()
          : html`
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                  ${this.glassIcon()}
                  <div class="space-y-1">
                    ${this.glassLabel()}
                    ${this.glassValue()}
                  </div>
                </div>
                <div class="pt-1">${this.glassTrend()}</div>
              </div>
              <div class="mt-2">${this.glassHelper()}</div>
            `}
      </div>
    `;
  }
}
