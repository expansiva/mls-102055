/// <mls fileReference="_102055_/l2/molecules/groupenterdatetime/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupenterdatetime/ml-datetime-picker-glass';

@customElement('molecules--groupenterdatetime--index-102055')
export class GroupEnterDatetimeIndex extends StateLitElement {
  @state() private dt: string | null = '2026-06-18T14:30:00';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterDatetime · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Datetime</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <groupenterdatetime--ml-datetime-picker-glass
            .value=${this.dt}
            .isEditing=${true}
            locale="pt-BR"
            minute-step="15"
            @change=${(e: CustomEvent) => {
              this.dt = e.detail.value;
            }}
          >
            <Label>Agendamento</Label>
            <Helper>Selecionado: ${this.dt ?? '—'}</Helper>
          </groupenterdatetime--ml-datetime-picker-glass>
        </section>
      </div>
    `;
  }
}
