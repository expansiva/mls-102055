/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupnotifyuser/ml-alert-modal-glass';
import '/_102055_/l2/molecules/groupnotifyuser/ml-notify-banner-glass';
import '/_102055_/l2/molecules/groupnotifyuser/ml-toast-notification-glass';

@customElement('molecules--groupnotifyuser--index-102055')
export class GroupNotifyUserIndex extends StateLitElement {
  @state() private bannerVisible = true;
  @state() private toastVisible = true;
  @state() private modalOpen = false;

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:2.5rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupNotifyUser · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Notify User</h1>
        </header>

        <section style="max-width:32rem; margin:0 auto; display:flex; flex-direction:column; gap:1rem;">
          <groupnotifyuser--ml-notify-banner-glass
            type="success"
            .visible=${this.bannerVisible}
            @dismiss=${() => {
              this.bannerVisible = false;
            }}
          >
            <Title>Tudo certo</Title>
            <Message>Banner de sucesso translúcido.</Message>
          </groupnotifyuser--ml-notify-banner-glass>

          <groupnotifyuser--ml-toast-notification-glass
            type="info"
            .visible=${this.toastVisible}
            @dismiss=${() => {
              this.toastVisible = false;
            }}
          >
            <Title>Toast</Title>
            <Message>Notificação curta em vidro.</Message>
          </groupnotifyuser--ml-toast-notification-glass>

          <div style="display:flex; justify-content:center; margin-top:0.5rem;">
            <button
              style="padding:0.5rem 1rem; border-radius:10px; border:1px solid rgba(255,255,255,0.25); background:rgba(255,255,255,0.12); color:#fff; cursor:pointer;"
              @click=${() => {
                this.modalOpen = true;
              }}
            >
              Abrir modal
            </button>
          </div>
        </section>

        <groupnotifyuser--ml-alert-modal-glass
          type="warning"
          .visible=${this.modalOpen}
          @dismiss=${() => {
            this.modalOpen = false;
          }}
        >
          <Title>Atenção</Title>
          <Message>Modal de vidro com scrim desfocado.</Message>
        </groupnotifyuser--ml-alert-modal-glass>
      </div>
    `;
  }
}
