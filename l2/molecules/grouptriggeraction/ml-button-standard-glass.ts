/// <mls fileReference="_102055_/l2/molecules/grouptriggeraction/ml-button-standard-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BUTTON STANDARD — GLASSMORPHISM (mls-102055)
// =============================================================================
// Skill Group: groupTriggerAction
// Casca (estratégia D): herda tudo de ButtonStandardMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { ButtonStandardMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

@customElement('grouptriggeraction--ml-button-standard-glass')
export class ButtonStandardGlass extends ButtonStandardMolecule {}
