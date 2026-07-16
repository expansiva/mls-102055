/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-select-dropdown-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SELECT DROPDOWN — GLASSMORPHISM (mls-102055)
// =============================================================================
// Skill Group: groupSelectOne
// Casca (estratégia D): herda tudo de MlSelectDropdownMolecule (mls-102040),
// inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlSelectDropdownMolecule } from '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';

@customElement('groupselectone--ml-select-dropdown-glass')
export class MlSelectDropdownGlass extends MlSelectDropdownMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o painel por div[data-widget="...-glass"].
  protected portalWidgetName = 'groupselectone--ml-select-dropdown-glass';
}
