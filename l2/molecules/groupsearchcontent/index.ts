/// <mls fileReference="_102055_/l2/molecules/groupsearchcontent/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102055_/l2/molecules/groupsearchcontent/ml-search-bar-glass';

@customElement('molecules--groupsearchcontent--index-102055')
export class GroupSearchContentIndex extends StateLitElement {
  @state() private query: string | null = null;
  @state() private lastSearch = '';

  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSearchContent · glassmorphism · 102055 (herança)</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Search Content</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto;">
          <groupsearchcontent--ml-search-bar-glass
            .value=${this.query}
            @change=${(e: CustomEvent) => { this.query = e.detail.value; }}
            @search=${(e: CustomEvent) => { this.lastSearch = e.detail.query; }}
            @clear=${() => { this.query = null; this.lastSearch = ''; }}
          >
            <Label>Buscar</Label>
            <Helper>Última busca: ${this.lastSearch || '—'}</Helper>
            <Suggestion value="lit">Lit</Suggestion>
            <Suggestion value="ts">TypeScript</Suggestion>
            <Suggestion value="less">LESS</Suggestion>
            <Suggestion value="glass">Glassmorphism</Suggestion>
          </groupsearchcontent--ml-search-bar-glass>
        </section>
      </div>
    `;
  }
}
