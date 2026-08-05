import { describe, it, expect } from 'vitest'
import { calculateRFPEstimate } from './calculator'

describe('EstimatingEngine Calculator Unit Tests', () => {
  it('should correctly calculate deep piling project estimates', () => {
    const res = calculateRFPEstimate({
      sqft: 100000,
      foundationType: 'DEEP_PILING',
      contingencyPercent: 10,
      laborRateModifier: 1.1,
    })

    expect(res.baseLaborCost).toBe(8250000) // 100k * 75 * 1.1
    expect(res.materialsCost).toBe(3500000) // 100k * 35
    expect(res.subtotal).toBe(11750000)
    expect(res.contingencyAmount).toBe(1175000)
    expect(res.grandTotal).toBe(12925000)
  })

  it('should throw an error for negative or zero SQFT', () => {
    expect(() => calculateRFPEstimate({
      sqft: 0,
      foundationType: 'SHALLOW_SLAB',
      contingencyPercent: 5,
    })).toThrow('Project SQFT must be greater than zero.')
  })

  it('should throw an error if SQFT exceeds 10M threshold safeguard', () => {
    expect(() => calculateRFPEstimate({
      sqft: 15000000,
      foundationType: 'DEEP_PILING',
      contingencyPercent: 5,
    })).toThrow('Project SQFT exceeds maximum allowable calculation threshold')
  })
})
