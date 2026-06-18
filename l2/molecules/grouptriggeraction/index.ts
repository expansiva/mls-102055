/// <mls fileReference="_102055_/l2/molecules/grouptriggeraction/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra as moléculas do grupo (side-effect import)
import '/_102055_/l2/molecules/grouptriggeraction/ml-button-standard-glass';
import '/_102055_/l2/molecules/grouptriggeraction/ml-icon-button-glass';
import '/_102055_/l2/molecules/grouptriggeraction/ml-split-button-glass';

@customElement('molecules--grouptriggeraction--index-102055')
export class GroupTriggerActionIndex extends StateLitElement {
  @state() private lastAction = '—';

  private onAction(label: string, e: CustomEvent) {
    const detail = e.detail as { value?: string };
    this.lastAction = detail && detail.value ? `${label}: ${detail.value}` : label;
  }

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupTriggerAction · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Trigger Action</h1>
          <p style="color:rgba(255,255,255,0.7); font-size:0.875rem;">Última ação: ${this.lastAction}</p>
        </header>

        <section style="max-width:40rem; margin:0 auto; display:flex; flex-direction:column; gap:2rem;">
          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center;">
            <grouptriggeraction--ml-button-standard-glass
              data-variant="primary"
              @action=${(e: CustomEvent) => this.onAction('Primary', e)}
            >
              <Label>Primary</Label>
            </grouptriggeraction--ml-button-standard-glass>
            <grouptriggeraction--ml-button-standard-glass
              data-variant="secondary"
              @action=${(e: CustomEvent) => this.onAction('Secondary', e)}
            >
              <Label>Secondary</Label>
            </grouptriggeraction--ml-button-standard-glass>
            <grouptriggeraction--ml-button-standard-glass
              data-variant="danger"
              @action=${(e: CustomEvent) => this.onAction('Danger', e)}
            >
              <Label>Danger</Label>
            </grouptriggeraction--ml-button-standard-glass>
            <grouptriggeraction--ml-button-standard-glass
              data-variant="ghost"
              @action=${(e: CustomEvent) => this.onAction('Ghost', e)}
            >
              <Label>Ghost</Label>
            </grouptriggeraction--ml-button-standard-glass>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
            <grouptriggeraction--ml-icon-button-glass
              size="md"
              @action=${(e: CustomEvent) => this.onAction('IconAdd', e)}
            >
              <Label>Adicionar</Label>
              <Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M12 5v14M5 12h14"/></svg></Icon>
            </grouptriggeraction--ml-icon-button-glass>
            <grouptriggeraction--ml-icon-button-glass size="md" loading="true"><Label>Carregando</Label></grouptriggeraction--ml-icon-button-glass>

            <grouptriggeraction--ml-split-button-glass @action=${(e: CustomEvent) => this.onAction('Split', e)}>
              <Label value="save">Salvar</Label>
              <span value="save-new">Salvar e criar novo</span>
              <span value="save-copy">Salvar como cópia</span>
            </grouptriggeraction--ml-split-button-glass>
          </div>
        </section>
      </div>
    `;
  }
}
