/// <mls fileReference="_102055_/l2/molecules/grouptriggeraction/ml-icon-button-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ICON BUTTON — GLASSMORPHISM (mls-102055) — Strategy D shell
// =============================================================================
// Skill Group: groupTriggerAction
// Herda IconButtonMolecule (mls-102040) sem sobrescrever render():
// o render() herdado emite classes semânticas ml-*; toda a aparência
// glass vive no .less homônimo, escopado sob a tag -glass.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { IconButtonMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-icon-button.js';

@customElement('grouptriggeraction--ml-icon-button-glass')
export class IconButtonGlass extends IconButtonMolecule {}
