/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-collapsible-panel-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COLLAPSIBLE PANEL — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlCollapsiblePanelMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlCollapsiblePanelMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-collapsible-panel.js';

@customElement('groupexpandcontent--ml-collapsible-panel-glass')
export class MlCollapsiblePanelGlass extends MlCollapsiblePanelMolecule {}
