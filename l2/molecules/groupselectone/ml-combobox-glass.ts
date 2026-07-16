/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-combobox-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COMBOBOX — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlComboboxMolecule (mls-102040), inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlComboboxMolecule } from '/_102040_/l2/molecules/groupselectone/ml-combobox.js';

@customElement('groupselectone--ml-combobox-glass')
export class MlComboboxGlass extends MlComboboxMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o conteúdo por div[data-widget="...-glass"].
  protected portalWidgetName = 'groupselectone--ml-combobox-glass';
}
