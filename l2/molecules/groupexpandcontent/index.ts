/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupexpandcontent/ml-accordion-glass';
import '/_102055_/l2/molecules/groupexpandcontent/ml-collapsible-panel-glass';
import '/_102055_/l2/molecules/groupexpandcontent/ml-reveal-overlay-glass';

@customElement('molecules--groupexpandcontent--index-102055')
export class GroupExpandContentIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#3b1d60 45%,#9d174d 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupExpandContent · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Expand Content</h1>
        </header>
        <section style="max-width:40rem; margin:0 auto;">
          <groupexpandcontent--ml-accordion-glass multiple="true">
            <Label>Project details</Label>
            <Section title="Overview" expanded>Share the project scope and expected outcomes.</Section>
            <Section title="Timeline">Milestones are due every Friday.</Section>
            <Section title="Risks">Track vendor delays closely.</Section>
          </groupexpandcontent--ml-accordion-glass>

          <div style="margin-top:1.5rem;">
            <groupexpandcontent--ml-collapsible-panel-glass>
              <Label>Perguntas frequentes</Label>
              <Section title="Como começar?" subtitle="Primeiros passos" icon="🚀" expanded>
                Crie a conta e siga o onboarding.
              </Section>
              <Section title="Posso cancelar?" subtitle="Assinatura">Sim, a qualquer momento.</Section>
            </groupexpandcontent--ml-collapsible-panel-glass>
          </div>

          <div style="margin-top:1.5rem;">
            <groupexpandcontent--ml-reveal-overlay-glass multiple="true">
              <Label>Conteúdo oculto até revelar</Label>
              <Section title="Chave de API">sk-live-9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c</Section>
            </groupexpandcontent--ml-reveal-overlay-glass>
          </div>
        </section>
      </div>
    `;
  }
}
