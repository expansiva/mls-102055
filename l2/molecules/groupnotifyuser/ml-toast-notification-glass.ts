/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-toast-notification-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TOAST NOTIFICATION — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de ToastNotificationMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { ToastNotificationMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';

@customElement('groupnotifyuser--ml-toast-notification-glass')
export class ToastNotificationGlass extends ToastNotificationMolecule {}
