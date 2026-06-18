/// <mls fileReference="_102055_/l2/molecules/groupshowprogress/ml-circular-progress-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML CIRCULAR PROGRESS — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupShowProgress
// Herda CircularProgressMolecule (mls-102040): contrato/props (value, size, label,
// showValue) e clamp/determinismo. Sobrescreve só render() + helpers de aparência.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CircularProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-circular-progress.js';

interface CircularProgressInternals {
  isDeterminate(): boolean;
  getClampedValue(): number;
  getAriaAttributes(value: number | null): unknown;
  getResolvedSize(): string;
}

@customElement('groupshowprogress--ml-circular-progress-glass')
export class CircularProgressGlass extends CircularProgressMolecule {
  private get x(): CircularProgressInternals {
    return this as unknown as CircularProgressInternals;
  }

  // ===========================================================================
  // RENDER (override) — lógica/clamp herdados via this.x
  // ===========================================================================
  render() {
    const determinate = this.x.isDeterminate();
    const clampedValue = determinate ? this.x.getClampedValue() : null;
    const showText = determinate && this.showValue;
    const ariaAttrs = this.x.getAriaAttributes(clampedValue);
    return html`
      <div class="${this.glassWrapperClasses()}" role="progressbar" aria-label="${this.label || 'Progress'}" ${ariaAttrs}>
        ${this.glassRenderSvg(clampedValue, determinate)}
        ${showText ? html`<div class="${this.glassValueTextClasses()}">${Math.round(clampedValue || 0)}%</div>` : html``}
      </div>
    `;
  }

  // ===========================================================================
  // SVG RENDERING (glass)
  // ===========================================================================
  private glassRenderSvg(value: number | null, determinate: boolean): TemplateResult {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = determinate && value !== null ? circumference * (1 - value / 100) : circumference * 0.25;
    return html`
      <svg viewBox="0 0 100 100" class="${this.glassSvgClasses()}" aria-hidden="true">
        ${svg`
          <circle cx="50" cy="50" r="45" fill="none" stroke-width="10" class="glass-cp-track"></circle>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${dashOffset}"
            class="glass-cp-fill"
            transform="${determinate ? 'rotate(-90 50 50)' : ''}"
          >
            ${!determinate
              ? svg`<animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>`
              : svg``}
          </circle>
        `}
      </svg>
    `;
  }

  // ---- helpers presentacionais (glass) ----
  private glassWrapperClasses(): string {
    return ['glass-cp relative inline-flex items-center justify-center', this.glassSizeClasses()].join(' ');
  }

  private glassSvgClasses(): string {
    return 'w-full h-full';
  }

  private glassValueTextClasses(): string {
    return 'glass-cp-value absolute text-xs font-medium pointer-events-none';
  }

  private glassSizeClasses(): string {
    const size = this.x.getResolvedSize();
    const map: Record<string, string> = {
      xs: 'w-4 h-4',
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-16 h-16',
    };
    return map[size] || map.md;
  }
}
