export interface RFPInput {
  sqft: number;
  foundationType: 'DEEP_PILING' | 'SHALLOW_SLAB' | 'REINFORCED_MAT';
  contingencyPercent: number;
  laborRateModifier?: number;
}

export interface RFPOutput {
  baseLaborCost: number;
  materialsCost: number;
  subtotal: number;
  contingencyAmount: number;
  grandTotal: number;
}

export function calculateRFPEstimate(input: RFPInput): RFPOutput {
  if (input.sqft <= 0) {
    throw new Error('Project SQFT must be greater than zero.');
  }

  if (input.sqft > 10_000_000) {
    throw new Error('Project SQFT exceeds maximum allowable calculation threshold (10M SQFT).');
  }

  const baseRatePerSqft = input.foundationType === 'DEEP_PILING' ? 75 : input.foundationType === 'REINFORCED_MAT' ? 60 : 45;
  const modifier = input.laborRateModifier ?? 1.0;

  const baseLaborCost = Math.round(input.sqft * baseRatePerSqft * modifier);
  const materialsCost = Math.round(input.sqft * 35);
  const subtotal = baseLaborCost + materialsCost;

  const contingencyAmount = Math.round(subtotal * (input.contingencyPercent / 100));
  const grandTotal = subtotal + contingencyAmount;

  return {
    baseLaborCost,
    materialsCost,
    subtotal,
    contingencyAmount,
    grandTotal,
  };
}
