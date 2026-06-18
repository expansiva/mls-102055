/// <mls fileReference="_102055_/l2/molecules/groupselectone/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102055_/l2/molecules/groupselectone/ml-select-dropdown-glass';
import '/_102055_/l2/molecules/groupselectone/ml-radio-group-glass';
import '/_102055_/l2/molecules/groupselectone/ml-segmented-control-glass';
import '/_102055_/l2/molecules/groupselectone/ml-combobox-glass';
import '/_102055_/l2/molecules/groupselectone/ml-card-selector-glass';

@customElement('molecules--groupselectone--index-102055')
export class GroupSelectOneIndex extends StateLitElement {
  @state() private country = 'br';
  @state() private plan = 'pro';
  @state() private view = 'month';
  @state() private fruit = 'apple';
  @state() private tier = 'pro';

  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSelectOne · glassmorphism · 102055 (herança)</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Select One</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <groupselectone--ml-select-dropdown-glass searchable="true" .value=${this.country} .isEditing=${true} @change=${(e: CustomEvent) => { this.country = e.detail.value; }}>
            <Label>País</Label>
            <Helper>Selecionado: ${this.country}</Helper>
            <Item value="br">Brasil</Item>
            <Item value="us">Estados Unidos</Item>
            <Item value="pt">Portugal</Item>
            <Item value="jp">Japão</Item>
          </groupselectone--ml-select-dropdown-glass>

          <groupselectone--ml-radio-group-glass .value=${this.plan} .isEditing=${true} @change=${(e: CustomEvent) => { this.plan = e.detail.value; }}>
            <Label>Plano</Label>
            <Item value="free">Gratuito</Item>
            <Item value="standard">Standard</Item>
            <Item value="pro">Pro</Item>
          </groupselectone--ml-radio-group-glass>

          <groupselectone--ml-segmented-control-glass .value=${this.view} .isEditing=${true} @change=${(e: CustomEvent) => { this.view = e.detail.value; }}>
            <Label>Visualização</Label>
            <Item value="day">Dia</Item>
            <Item value="week">Semana</Item>
            <Item value="month">Mês</Item>
          </groupselectone--ml-segmented-control-glass>

          <groupselectone--ml-combobox-glass .value=${this.fruit} clearable @change=${(e: CustomEvent) => { this.fruit = e.detail.value; }}>
            <Label>Fruta</Label>
            <Helper>Selecionado: ${this.fruit ?? '—'}</Helper>
            <Item value="apple">Maçã</Item>
            <Item value="banana">Banana</Item>
            <Item value="grape">Uva</Item>
            <Item value="orange">Laranja</Item>
          </groupselectone--ml-combobox-glass>

          <groupselectone--ml-card-selector-glass .value=${this.tier} searchable @change=${(e: CustomEvent) => { this.tier = e.detail.value; }}>
            <Label>Tier</Label>
            <Helper>Selecionado: ${this.tier}</Helper>
            <Item value="free"><strong>Free</strong><br /><span style="opacity:.7">R$ 0/mês</span></Item>
            <Item value="pro"><strong>Pro</strong><br /><span style="opacity:.7">R$ 49/mês</span></Item>
            <Item value="business"><strong>Business</strong><br /><span style="opacity:.7">R$ 149/mês</span></Item>
          </groupselectone--ml-card-selector-glass>
        </section>
      </div>
    `;
  }
}
