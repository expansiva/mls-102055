/// <mls fileReference="_102055_/l2/molecules/groupshowprogress/ml-linear-progress-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML LINEAR PROGRESS — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupShowProgress
// Herda LinearProgressMolecule (mls-102040): contrato/props (value, size, label,
// showValue, variant) e clamp. Sobrescreve só render() + helpers de aparência.
// This molecule does NOT contain business logic.
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LinearProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-linear-progress.js';

interface LinearProgressInternals {
  getNormalizedValue(): number | null;
  getTextSizeClasses(): string;
}

@customElement('groupshowprogress--ml-linear-progress-glass')
export class LinearProgressGlass extends LinearProgressMolecule {
  private get x(): LinearProgressInternals {
    return this as unknown as LinearProgressInternals;
  }

  // ---- helpers presentacionais (glass) — nomes próprios p/ não colidir com os private do pai ----
  private glassSizeClasses(): string {
    const sizeMap: Record<string, string> = {
      xs: 'glass-lp--xs',
      sm: 'glass-lp--sm',
      md: 'glass-lp--md',
      lg: 'glass-lp--lg',
    };
    return sizeMap[this.size] || sizeMap.md;
  }

  private glassTrackClasses(): string {
    return 'glass-lp-track w-full overflow-hidden';
  }

  private glassFillClasses(isIndeterminate: boolean): string {
    return ['glass-lp-fill h-full', `is-${this.variant}`, isIndeterminate ? 'is-indeterminate' : '']
      .filter(Boolean)
      .join(' ');
  }

  private glassValueText(value: number | null) {
    if (value === null || !this.showValue) return null;
    const textClasses = ['glass-lp-value min-w-[3rem] text-right', this.x.getTextSizeClasses()].join(' ');
    return html`<span class="${textClasses}">${Math.round(value)}%</span>`;
  }

  // ===========================================================================
  // RENDER (override) — lógica/clamp herdados via this.x
  // ===========================================================================
  render() {
    const normalized = this.x.getNormalizedValue();
    const isIndeterminate = normalized === null;

    const trackClasses = [this.glassTrackClasses(), this.glassSizeClasses()].join(' ');

    const fillClasses = this.glassFillClasses(isIndeterminate);
    const widthStyle = isIndeterminate ? '' : `width: ${normalized}%;`;

    const ariaAttrs = {
      role: 'progressbar',
      'aria-label': this.label || undefined,
      'aria-valuemin': isIndeterminate ? undefined : '0',
      'aria-valuemax': isIndeterminate ? undefined : '100',
      'aria-valuenow': isIndeterminate ? undefined : String(normalized),
    } as Record<string, string | undefined>;

    return html`
      <div class="w-full flex items-center gap-2" ...=${ariaAttrs}>
        <div class="${trackClasses}">
          <div class="${fillClasses}" style="${widthStyle}" aria-hidden="true"></div>
        </div>
        ${this.glassValueText(isIndeterminate ? null : normalized)}
      </div>
    `;
  }
}
