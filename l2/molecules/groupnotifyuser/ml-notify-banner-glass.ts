/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-notify-banner-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NOTIFY BANNER — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de NotifyBannerMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { NotifyBannerMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';

@customElement('groupnotifyuser--ml-notify-banner-glass')
export class NotifyBannerGlass extends NotifyBannerMolecule {}
