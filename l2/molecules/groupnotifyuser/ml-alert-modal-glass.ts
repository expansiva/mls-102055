/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-alert-modal-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ALERT MODAL — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlAlertModalMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlAlertModalMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';

@customElement('groupnotifyuser--ml-alert-modal-glass')
export class MlAlertModalGlass extends MlAlertModalMolecule {}
