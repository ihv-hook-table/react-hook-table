type MoneyFormatProps = {
  currency?: string;
  amount?: number;
  language?: string;
  minimumFractionDigits?: number;
};

export const formatMoney = ({
  amount,
  currency = 'EUR',
  minimumFractionDigits = 2,
  language,
}: MoneyFormatProps) => {
  const value = amount
    ? new Intl.NumberFormat(language || navigator.language, {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits,
      }).format(amount)
    : '-';

  return value;
};
