/// <mls fileReference="_102055_/l2/molecules/groupenternumber/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupenternumber/ml-number-stepper-glass';
import '/_102055_/l2/molecules/groupenternumber/ml-range-slider-glass';

@customElement('molecules--groupenternumber--index-102055')
export class GroupEnterNumberIndex extends StateLitElement {
  @state() private qty = 2;
  @state() private priceLow = 200;
  @state() private priceHigh = 800;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterNumber · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Number</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <groupenternumber--ml-number-stepper-glass
            .value=${this.qty}
            min="0"
            max="10"
            step="1"
            .isEditing=${true}
            @input=${(e: CustomEvent) => {
              this.qty = e.detail.value;
            }}
          >
            <Label>Quantidade</Label>
            <Helper>Selecionado: ${this.qty}</Helper>
          </groupenternumber--ml-number-stepper-glass>

          <groupenternumber--ml-range-slider-glass
            .value=${this.priceLow}
            .valueHigh=${this.priceHigh}
            min="0"
            max="1000"
            step="50"
            locale="pt-BR"
            .isEditing=${true}
            @input=${(e: CustomEvent) => {
              this.priceLow = e.detail.value.min;
              this.priceHigh = e.detail.value.max;
            }}
          >
            <Label>Faixa de preço</Label>
            <Helper>${this.priceLow} – ${this.priceHigh}</Helper>
            <Prefix>R$</Prefix>
          </groupenternumber--ml-range-slider-glass>
        </section>
      </div>
    `;
  }
}
