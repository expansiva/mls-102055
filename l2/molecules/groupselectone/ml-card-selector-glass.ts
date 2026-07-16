/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-card-selector-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CARD SELECTOR — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlCardSelectorMolecule (mls-102040), inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlCardSelectorMolecule } from '/_102040_/l2/molecules/groupselectone/ml-card-selector.js';

@customElement('groupselectone--ml-card-selector-glass')
export class MlCardSelectorGlass extends MlCardSelectorMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o conteúdo por div[data-widget="...-glass"].
  protected portalWidgetName = 'groupselectone--ml-card-selector-glass';
}
