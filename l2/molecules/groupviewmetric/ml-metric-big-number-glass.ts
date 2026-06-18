/// <mls fileReference="_102055_/l2/molecules/groupviewmetric/ml-metric-big-number-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC BIG NUMBER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupViewMetric
// Herda MlMetricBigNumberMolecule (mls-102040): contrato/slots/loading intactos.
// Sobrescreve só render() + helpers presentacionais (glass). Display-only.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlMetricBigNumberMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

@customElement('groupviewmetric--ml-metric-big-number-glass')
export class MlMetricBigNumberGlass extends MlMetricBigNumberMolecule {
  // ===========================================================================
  // RENDER (override) — contrato/slots/loading herdados
  // ===========================================================================
  render(): TemplateResult {
    if (this.loading) {
      return this.glassLoadingSkeleton();
    }

    if (!this.hasSlot('Value')) {
      return html``;
    }

    const ariaLabel = this.glassAriaLabel();

    return html`
      <div class="${this.glassContainerClasses()}" role="figure" aria-label="${ariaLabel}">
        ${this.hasSlot('Icon') ? this.glassIcon() : html``}
        ${this.hasSlot('Label') ? this.glassLabel() : html``}
        ${this.glassValue()}
        ${this.hasSlot('Trend') ? this.glassTrend() : html``}
        ${this.hasSlot('Helper') ? this.glassHelper() : html``}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER HELPERS (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassIcon(): TemplateResult {
    const content = this.getSlotContent('Icon');
    return html`<div class="glass-bn-icon flex items-center">${unsafeHTML(content)}</div>`;
  }

  private glassLabel(): TemplateResult {
    const content = this.getSlotContent('Label');
    return html`<div class="glass-bn-label text-sm font-medium">${unsafeHTML(content)}</div>`;
  }

  private glassValue(): TemplateResult {
    const content = this.getSlotContent('Value');
    return html`<div class="glass-bn-value text-4xl leading-tight font-semibold" aria-live="polite">${unsafeHTML(content)}</div>`;
  }

  private glassTrend(): TemplateResult {
    const direction = this.glassTrendDirection();
    const content = this.getSlotContent('Trend');
    return html`<div class="${this.glassTrendClasses(direction)}" aria-label="Trend: ${direction}">${unsafeHTML(content)}</div>`;
  }

  private glassHelper(): TemplateResult {
    const content = this.getSlotContent('Helper');
    return html`<div class="glass-bn-helper text-xs">${unsafeHTML(content)}</div>`;
  }

  private glassLoadingSkeleton(): TemplateResult {
    return html`
      <div class="${this.glassContainerClasses()}" role="figure" aria-busy="true">
        <div class="glass-bn-skel h-4 w-24"></div>
        <div class="glass-bn-skel mt-2 h-10 w-40"></div>
        <div class="glass-bn-skel mt-2 h-4 w-20"></div>
      </div>
    `;
  }

  // ===========================================================================
  // CLASS HELPERS (glass)
  // ===========================================================================
  private glassContainerClasses(): string {
    return 'glass-bn flex flex-col gap-1 p-4';
  }

  private glassTrendClasses(direction: 'up' | 'down' | 'neutral'): string {
    const dir = direction === 'up' ? 'is-up' : direction === 'down' ? 'is-down' : 'is-neutral';
    return `glass-bn-trend ${dir} inline-flex items-center gap-1 text-sm font-medium`;
  }

  // ===========================================================================
  // UTILITIES (glass)
  // ===========================================================================
  private glassTrendDirection(): 'up' | 'down' | 'neutral' {
    const dir = this.getSlotAttr('Trend', 'direction');
    if (dir === 'up' || dir === 'down' || dir === 'neutral') return dir;
    return 'neutral';
  }

  private glassAriaLabel(): string {
    const raw = this.getSlotContent('Label') || 'Metric';
    return raw.replace(/<[^>]*>/g, '').trim() || 'Metric';
  }
}
