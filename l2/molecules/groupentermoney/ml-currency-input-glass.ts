/// <mls fileReference="_102055_/l2/molecules/groupentermoney/ml-currency-input-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CURRENCY INPUT — GLASSMORPHISM (mls-102055)
// =============================================================================
// Skill Group: groupEnterMoney
// Casca (estratégia D): herda tudo de GroupEnterMoneyMlCurrencyInputMolecule
// (mls-102040) — parsing BigInt, clamp min/max, formatação Intl e render() —
// o markup base emite classes semânticas ml-*; a aparência glass vem do .less
// irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { GroupEnterMoneyMlCurrencyInputMolecule } from '/_102040_/l2/molecules/groupentermoney/ml-currency-input.js';

@customElement('groupentermoney--ml-currency-input-glass')
export class CurrencyInputGlass extends GroupEnterMoneyMlCurrencyInputMolecule {}
