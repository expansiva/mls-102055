/// <mls fileReference="_102055_/l2/molecules/groupenternumberinterval/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import '/_102055_/l2/molecules/groupenternumberinterval/ml-number-range-slider-glass';

@customElement('molecules--groupenternumberinterval--index-102055')
export class GroupEnterNumberIntervalIndex extends StateLitElement {
  // ── Showcase card states ─────────────────────────────────────
  @state() private cardRange = {
    startValue: 250,
    endValue: 750,
  };

  // =========================================================================== HERO
  private renderHero(): TemplateResult {
    return html`
      <header
        class="px-8 py-20 text-center border-b border-white/20"
        style="background: rgba(255,255,255,0.06); backdrop-filter: blur(10px);"
      >
        <span
          class="inline-block px-3 py-1 bg-indigo-400/20 text-indigo-100 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
        >
          groupEnterNumberInterval
        </span>
        <h1 class="text-5xl font-bold text-white mb-5 tracking-tight">
          Enter Number Interval
        </h1>
        <p class="text-lg text-indigo-100/80 max-w-2xl mx-auto leading-relaxed">
          Capture a numeric range with lower and upper values for price bands, age brackets,
          measurements, and bounded filters. This group provides a themed dual-handle range
          slider with support for bounds, steps, decimals, locale formatting, and value gaps.
        </p>
      </header>
    `;
  }

  // =========================================================================== SHOWCASE CARDS
  private renderShowcaseCards(): TemplateResult {
    return html`
      <section
        class="px-8 py-12 border-b border-white/20"
        style="background: rgba(255,255,255,0.04);"
      >
        <div class="max-w-2xl mx-auto flex flex-col gap-5">
          <div
            class="rounded-2xl border border-white/25 shadow-lg overflow-hidden"
            style="background: rgba(255,255,255,0.10); backdrop-filter: blur(10px);"
          >
            <div class="h-1 bg-violet-400 rounded-t-2xl"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-bold text-white">Glass range slider</p>
                <code class="text-xs bg-white/10 text-indigo-100 px-2 py-0.5 rounded">
                  groupenternumberinterval--ml-number-range-slider-glass
                </code>
              </div>
              <p class="text-xs text-indigo-100/65 mb-5">
                Select a bounded price interval with a dual-handle control.
              </p>
              <groupenternumberinterval--ml-number-range-slider-glass
                data-class="w-full"
                name="price-range"
                .startValue=${this.cardRange.startValue}
                .endValue=${this.cardRange.endValue}
                .min=${0}
                .max=${1000}
                .step=${50}
                .decimals=${0}
                .minGap=${100}
                .isEditing=${true}
                @change=${(e: CustomEvent<{ startValue: number | null; endValue: number | null }>) => {
                  this.cardRange = {
                    startValue: e.detail.startValue ?? 0,
                    endValue: e.detail.endValue ?? 0,
                  };
                }}
              >
                <Label data-class="text-white">Price range</Label>
                <LabelStart data-class="text-indigo-100">From</LabelStart>
                <LabelEnd data-class="text-indigo-100">To</LabelEnd>
                <Prefix data-class="text-indigo-100">$</Prefix>
                <Suffix data-class="text-indigo-100">USD</Suffix>
                <Helper data-class="text-indigo-100/70">
                  Choose at least $100 between the lower and upper values.
                </Helper>
              </groupenternumberinterval--ml-number-range-slider-glass>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // =========================================================================== REFERENCE TABLE
  private renderReferenceTable(): TemplateResult {
    const rows: Array<{ scenario: string; componentA: boolean }> = [
      { scenario: 'Interactive bounded range with handles', componentA: true },
      { scenario: 'Price, quantity, age, or measurement interval', componentA: true },
      { scenario: 'Decimal values with locale-aware formatting', componentA: true },
      { scenario: 'Minimum or maximum distance between values', componentA: true },
    ];
    const headers = [
      { label: 'Glass range slider', cls: 'text-violet-200' },
    ];

    return html`
      <section
        class="px-8 py-20 border-t border-white/20"
        style="background: rgba(255,255,255,0.07);"
      >
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl font-bold text-white mb-2">Quick reference</h2>
          <p class="text-sm text-indigo-100/75 mb-8">
            Choose this range slider when users need to adjust two related numeric bounds while
            seeing the interval in context.
          </p>
          <div
            class="rounded-2xl border border-white/25 overflow-hidden shadow-lg"
            style="background: rgba(255,255,255,0.10); backdrop-filter: blur(18px);"
          >
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-white/10 border-b border-white/20">
                  <th class="text-left px-5 py-3.5 text-xs font-semibold text-indigo-100/75 uppercase tracking-wide w-3/4">
                    Scenario
                  </th>
                  ${headers.map((h) => html`
                    <th class="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide ${h.cls}">
                      ${h.label}
                    </th>
                  `)}
                </tr>
              </thead>
              <tbody>
                ${rows.map((row, i) => html`
                  <tr class="${i % 2 !== 0 ? 'bg-white/5' : ''} border-b border-white/10 last:border-0">
                    <td class="px-5 py-3.5 text-indigo-50/90">${row.scenario}</td>
                    ${([row.componentA] as boolean[]).map((ok) => html`
                      <td class="px-4 py-3.5 text-center">
                        ${ok
                          ? html`<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-bold">✓</span>`
                          : html`<span class="text-white/20 text-sm">—</span>`}
                      </td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="font-sans min-h-screen text-white"
        style="min-height:100vh; background: linear-gradient(135deg, #0f172a 0%, #312e81 45%, #7e22ce 100%);"
      >
        ${this.renderHero()}
        ${this.renderShowcaseCards()}
        ${this.renderReferenceTable()}
      </div>
    `;
  }
}
