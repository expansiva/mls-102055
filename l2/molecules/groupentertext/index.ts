/// <mls fileReference="_102055_/l2/molecules/groupentertext/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

// Registra a(s) molécula(s) do grupo (side-effect import)
import '/_102055_/l2/molecules/groupentertext/ml-floating-text-input-glass';
import '/_102055_/l2/molecules/groupentertext/ml-password-strength-input-glass';
import '/_102055_/l2/molecules/groupentertext/ml-tag-input-glass';

@customElement('molecules--groupentertext--index-102055')
export class GroupEnterTextIndex extends StateLitElement {
  @state() private fullName = '';
  @state() private password = 'Senha1!';
  @state() private tags = 'design, glass, lit';

  render(): TemplateResult {
    return html`
      <div
        style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#27286b 45%,#7e1f6a 100%); font-family:'Inter',system-ui,sans-serif;"
      >
        <header style="text-align:center; margin-bottom:3rem;">
          <span
            style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;"
            >groupEnterText · glassmorphism · 102055 (herança)</span
          >
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Enter Text</h1>
        </header>
        <section style="max-width:28rem; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem;">
          <groupentertext--ml-floating-text-input-glass
            .value=${this.fullName}
            .isEditing=${true}
            @input=${(e: CustomEvent) => {
              this.fullName = e.detail.value;
            }}
          >
            <Label>Full name</Label>
            <Helper>As shown on your document</Helper>
          </groupentertext--ml-floating-text-input-glass>

          <groupentertext--ml-password-strength-input-glass
            .value=${this.password}
            .isEditing=${true}
            min-length="8"
            required
            @input=${(e: CustomEvent) => {
              this.password = e.detail.value;
            }}
          >
            <Label>Senha</Label>
            <Helper>Use letras, números e símbolos</Helper>
          </groupentertext--ml-password-strength-input-glass>

          <groupentertext--ml-tag-input-glass
            .value=${this.tags}
            .isEditing=${true}
            @input=${(e: CustomEvent) => {
              this.tags = e.detail.value;
            }}
          >
            <Label>Tags</Label>
            <Helper>Enter ou vírgula para adicionar</Helper>
          </groupentertext--ml-tag-input-glass>
        </section>
      </div>
    `;
  }
}
