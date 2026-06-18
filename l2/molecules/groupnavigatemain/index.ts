/// <mls fileReference="_102055_/l2/molecules/groupnavigatemain/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupnavigatemain/ml-sidebar-nav-glass';

@customElement('molecules--groupnavigatemain--index-102055')
export class GroupNavigateMainIndex extends StateLitElement {
  @state() private navItem = 'dashboard';
  @state() private collapsed = false;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNavigateMain · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Navigate Main</h1>
        </header>
        <section style="max-width:56rem; margin:0 auto;">
          <div style="height:30rem; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,0.15); display:flex;">
            <groupnavigatemain--ml-sidebar-nav-glass
              .value=${this.navItem}
              .collapsed=${this.collapsed}
              @change=${(e: CustomEvent) => {
                this.navItem = e.detail.value;
              }}
              @collapse=${(e: CustomEvent) => {
                this.collapsed = e.detail.collapsed;
              }}
            >
              <Label>Aurora</Label>
              <Item value="dashboard" icon="▦">Dashboard</Item>
              <Item value="projects" icon="▤" badge="3">Projetos</Item>
              <Group label="Workspace">
                <Item value="tasks" icon="✓">Tarefas</Item>
                <Item value="calendar" icon="▣">Calendário</Item>
                <Item value="reports" icon="◔" disabled>Relatórios</Item>
              </Group>
              <Footer>
                <Item value="settings" icon="⚙">Configurações</Item>
                <Item value="logout" icon="⎋">Sair</Item>
              </Footer>
            </groupnavigatemain--ml-sidebar-nav-glass>
            <div style="flex:1; padding:1.5rem; color:rgba(255,255,255,0.85); background:rgba(255,255,255,0.04);">
              Selecionado: <strong>${this.navItem}</strong>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
