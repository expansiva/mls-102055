/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra as moléculas do grupo (side-effect import)
import '/_102055_/l2/molecules/groupnavigatesection/ml-tabs-glass';
import '/_102055_/l2/molecules/groupnavigatesection/ml-navigate-pills-glass';
import '/_102055_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail-glass';

@customElement('molecules--groupnavigatesection--index-102055')
export class GroupNavigateSectionIndex extends StateLitElement {
  @state() private bc = 'eletronicos';
  @state() private pill = 'overview';
  @state() private tab = 'details';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNavigateSection · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Navigate Section</h1>
        </header>
        <section style="max-width:42rem; margin:0 auto; display:flex; flex-direction:column; gap:2.5rem;">
          <groupnavigatesection--ml-breadcrumb-trail-glass
            .value=${this.bc}
            @change=${(e: CustomEvent) => {
              this.bc = e.detail.value;
            }}
          >
            <Tab value="home" title="Início">Página inicial.</Tab>
            <Tab value="catalogo" title="Catálogo">Lista de categorias.</Tab>
            <Tab value="eletronicos" title="Eletrônicos">Categoria de eletrônicos.</Tab>
            <Tab value="produto" title="Notebook Pro">Detalhes do produto atual.</Tab>
          </groupnavigatesection--ml-breadcrumb-trail-glass>

          <groupnavigatesection--ml-navigate-pills-glass
            .value=${this.pill}
            @change=${(e: CustomEvent) => {
              this.pill = e.detail.value;
            }}
          >
            <Label>Seções</Label>
            <Tab value="overview" title="Visão geral">Resumo do projeto, escopo e objetivos.</Tab>
            <Tab value="timeline" title="Cronograma">Marcos e entregas planejadas.</Tab>
            <Tab value="team" title="Equipe">Pessoas envolvidas e responsabilidades.</Tab>
            <Tab value="archive" title="Arquivado" disabled>Indisponível.</Tab>
          </groupnavigatesection--ml-navigate-pills-glass>

          <groupnavigatesection--ml-tabs-glass
            .value=${this.tab}
            @change=${(e: CustomEvent) => {
              this.tab = e.detail.value;
            }}
          >
            <Label>Produto</Label>
            <Tab value="details" title="Detalhes">Descrição completa do produto e especificações.</Tab>
            <Tab value="reviews" title="Avaliações">Comentários e notas dos clientes.</Tab>
            <Tab value="shipping" title="Entrega">Prazos e custos de envio.</Tab>
            <Tab value="legacy" title="Legado" disabled>Indisponível.</Tab>
          </groupnavigatesection--ml-tabs-glass>
        </section>
      </div>
    `;
  }
}
