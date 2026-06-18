/// <mls fileReference="_102055_/l2/molecules/groupselectmany/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102055_/l2/molecules/groupselectmany/ml-multi-select-dropdown-glass';
import '/_102055_/l2/molecules/groupselectmany/ml-popover-multi-select-glass';

@customElement('molecules--groupselectmany--index-102055')
export class GroupSelectManyIndex extends StateLitElement {
  @state() private skills = 'ts,js';
  @state() private langs = 'lit,ts';

  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSelectMany · glassmorphism · 102055 (herança)</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Select Many</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <groupselectmany--ml-multi-select-dropdown-glass searchable="true" .value=${this.skills} .isEditing=${true} @change=${(e: CustomEvent) => { this.skills = e.detail.value; }}>
            <Label>Tecnologias</Label>
            <Helper>Selecionadas: ${this.skills || '—'}</Helper>
            <Item value="ts">TypeScript</Item>
            <Item value="js">JavaScript</Item>
            <Item value="py">Python</Item>
            <Item value="go">Go</Item>
          </groupselectmany--ml-multi-select-dropdown-glass>

          <groupselectmany--ml-popover-multi-select-glass searchable max-selection="3" .value=${this.langs} .isEditing=${true} @change=${(e: CustomEvent) => { this.langs = e.detail.value; }}>
            <Label>Habilidades (máx. 3)</Label>
            <Helper>Selecionadas: ${this.langs || '—'}</Helper>
            <Item value="lit">Lit</Item>
            <Item value="ts">TypeScript</Item>
            <Item value="less">LESS</Item>
            <Item value="a11y">Acessibilidade</Item>
            <Item value="design">Design Systems</Item>
          </groupselectmany--ml-popover-multi-select-glass>
        </section>
      </div>
    `;
  }
}
