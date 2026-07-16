/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-tabs-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TABS — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlTabsMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlTabsMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-tabs.js';

@customElement('groupnavigatesection--ml-tabs-glass')
export class MlTabsGlass extends MlTabsMolecule {}
