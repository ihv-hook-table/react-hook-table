type FormatProps = {
  currency?: string;
  amount?: number;
  language?: string;
  minimumFractionDigits?: number;
};

const DECIMALS = {
  BTC: 8,
  ETH: 18,
  EUR: 2,
} as const;

type DecimalMap = typeof DECIMALS;
type Decimal = keyof DecimalMap;

const getMinimumFractionDigits = ({
  minimumFractionDigits,
  currency,
}: FormatProps) => {
  if (minimumFractionDigits) {
    return minimumFractionDigits;
  }

  return DECIMALS[<Decimal>currency] || 2;
};

export const formatMoney = ({
  amount,
  currency = 'EUR',
  minimumFractionDigits = 2,
  language,
}: FormatProps) => {
  const value = amount
    ? new Intl.NumberFormat(language || navigator.language, {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: getMinimumFractionDigits({
          minimumFractionDigits,
          currency,
        }),
      })
        .format(amount)
        .replace('BTC', '₿')
        .replace('ETH', 'Ξ')
    : '-';

  return value;
};
