import { useState } from 'react';

export function PriceCalculator() {
  const [salePrice, setSalePrice] = useState(115);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    if (!isNaN(newPrice)) {
      setSalePrice(newPrice);
    }
  };

  const listingFee = 0.36;
  const finalValueFee = 0.36;
  const regulatoryOperatingFee = 0.3;
  const ebayRoughMinimumFee = 0.1;
  const ebayRoughMaximumFee = 0.15;

  const ebayFixedFees = listingFee + finalValueFee + regulatoryOperatingFee;
  
  const ebayFeesMin = (salePrice * ebayRoughMinimumFee) + ebayFixedFees;
  const ebayFeesMax = (salePrice * ebayRoughMaximumFee) + ebayFixedFees;
  const postage = 5;

  const commissionMin = ((salePrice - postage - ebayFeesMax) * 0.3) 
  const commissionMax = ((salePrice - postage - ebayFeesMin) * 0.3);

  const returnedAmountMin = salePrice - ebayFeesMax - postage - commissionMax;
  const returnedAmountMax = salePrice - ebayFeesMin - postage - commissionMin;

  return (
    <div className="price-calculator">
      <table>
        <thead>
          <tr>
            <td><b>Final Sale Price</b></td>
            <td>
              £<input 
                type="number"
                value={salePrice}
                onChange={handlePriceChange}
                min="0"
                step="1"
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>eBay fees</td>
            <td>£{Math.round(ebayFeesMin * 100) / 100} - £{Math.round(ebayFeesMax * 100) / 100} (approx)</td>
          </tr>
          <tr>
            <td>Postage</td>
            <td>£{postage} (heavier or oversized items will cost more, potentially a lot more)</td>
          </tr>
          <tr>
            <td>Commission</td>
            <td>£{Math.round(commissionMin * 100) / 100} - £{Math.round(commissionMax * 100) / 100} (30%)</td>
          </tr>
          <tr>
            <td><b>Returned to you</b></td>
            <td><strong>£{Math.round(returnedAmountMin * 100) / 100} - £{Math.round(returnedAmountMax * 100) / 100} (Approx!)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}