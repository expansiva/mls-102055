/// <mls fileReference="_102055_/l2/molecules/groupentermoney/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupentermoney/ml-currency-input-glass';

@customElement('molecules--groupentermoney--index-102055')
export class GroupEnterMoneyIndex extends StateLitElement {
  @state() private price = 129.9;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterMoney · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Money</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto;">
          <groupentermoney--ml-currency-input-glass
            .value=${this.price}
            currency="BRL"
            locale="pt-BR"
            .isEditing=${true}
            @input=${(e: CustomEvent) => {
              this.price = e.detail.value;
            }}
          >
            <Label>Preço</Label>
            <Helper>Digite o valor em centavos</Helper>
          </groupentermoney--ml-currency-input-glass>
        </section>
      </div>
    `;
  }
}
