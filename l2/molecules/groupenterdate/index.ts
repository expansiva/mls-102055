/// <mls fileReference="_102055_/l2/molecules/groupenterdate/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupenterdate/ml-date-picker-glass';

@customElement('molecules--groupenterdate--index-102055')
export class GroupEnterDateIndex extends StateLitElement {
  @state() private date: string | null = '2026-06-18';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterDate · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Date</h1>
        </header>
        <section style="max-width:24rem; margin:0 auto;">
          <groupenterdate--ml-date-picker-glass
            .value=${this.date}
            locale="pt-BR"
            first-day-of-week="1"
            .isEditing=${true}
            @change=${(e: CustomEvent) => {
              this.date = e.detail.value;
            }}
          >
            <Label>Data de início</Label>
            <Helper>Selecionada: ${this.date ?? '—'}</Helper>
          </groupenterdate--ml-date-picker-glass>
        </section>
      </div>
    `;
  }
}
