/// <mls fileReference="_102055_/l2/molecules/groupsearchcontent/ml-search-bar-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SEARCH BAR — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlSearchBarMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlSearchBarMolecule } from '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';

@customElement('groupsearchcontent--ml-search-bar-glass')
export class MlSearchBarGlass extends MlSearchBarMolecule {}
