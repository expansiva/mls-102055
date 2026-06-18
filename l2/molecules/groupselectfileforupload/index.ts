/// <mls fileReference="_102055_/l2/molecules/groupselectfileforupload/index.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';

import '/_102055_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone-glass';

@customElement('molecules--groupselectfileforupload--index-102055')
export class GroupSelectFileForUploadIndex extends StateLitElement {
  render(): TemplateResult {
    return html`
      <div style="min-height:100vh; padding:2rem; background:linear-gradient(135deg,#0b1220 0%,#312e81 45%,#7e22ce 100%); font-family:'Inter',system-ui,sans-serif;">
        <header style="text-align:center; margin-bottom:3rem;">
          <span style="display:inline-block; padding:0.25rem 0.75rem; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:9999px; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">groupSelectFileForUpload · glassmorphism · 102055 (herança)</span>
          <h1 style="font-size:2.25rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Select File For Upload</h1>
        </header>
        <section style="max-width:32rem; margin:0 auto;">
          <groupselectfileforupload--ml-file-upload-dropzone-glass multiple accept="image/*" max-files="5" max-size-kb="2048">
            <Label>Imagens</Label>
            <Helper>Até 5 imagens, máx. 2 MB cada</Helper>
          </groupselectfileforupload--ml-file-upload-dropzone-glass>
        </section>
      </div>
    `;
  }
}
