/// <mls fileReference="_102055_/l2/molecules/groupviewcard/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra as moléculas do grupo (side-effect import)
import '/_102055_/l2/molecules/groupviewcard/ml-profile-card-glass';
import '/_102055_/l2/molecules/groupviewcard/ml-vertical-card-glass';
// Botão usado dentro do CardAction
import '/_102055_/l2/molecules/grouptriggeraction/ml-button-standard-glass';

@customElement('molecules--groupviewcard--index-102055')
export class GroupViewCardIndex extends StateLitElement {
  @state() private selectedPlan: 'pro' | 'enterprise' | null = 'pro';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupViewCard · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">View Card</h1>
        </header>

        <section style="max-width:48rem; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.5rem;">
          <groupviewcard--ml-profile-card-glass>
            <CardTitle>Ada Lovelace</CardTitle>
            <CardDescription>Engenheira de software</CardDescription>
            <CardContent>Primeira programadora da história, pioneira da computação.</CardContent>
            <CardFooter>Membro desde 2021</CardFooter>
          </groupviewcard--ml-profile-card-glass>

          <groupviewcard--ml-vertical-card-glass
            clickable="true"
            .selected=${this.selectedPlan === 'pro'}
            @cardClick=${() => {
              this.selectedPlan = 'pro';
            }}
          >
            <CardTitle>Plano Pro</CardTitle>
            <CardDescription>R$ 49/mês</CardDescription>
            <CardContent>Card vertical clicável (selecionável).</CardContent>
            <CardAction>
              <grouptriggeraction--ml-button-standard-glass data-variant="primary"><Label>Assinar</Label></grouptriggeraction--ml-button-standard-glass>
            </CardAction>
          </groupviewcard--ml-vertical-card-glass>

          <groupviewcard--ml-vertical-card-glass
            clickable="true"
            .selected=${this.selectedPlan === 'enterprise'}
            @cardClick=${() => {
              this.selectedPlan = 'enterprise';
            }}
          >
            <CardTitle>Plano Enterprise</CardTitle>
            <CardDescription>Sob consulta</CardDescription>
            <CardContent>Recursos dedicados, SLA e onboarding assistido.</CardContent>
            <CardAction>
              <grouptriggeraction--ml-button-standard-glass data-variant="secondary"><Label>Falar com vendas</Label></grouptriggeraction--ml-button-standard-glass>
            </CardAction>
          </groupviewcard--ml-vertical-card-glass>
        </section>
      </div>
    `;
  }
}
