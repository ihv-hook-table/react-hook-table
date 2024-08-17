const DECIMALS = {
  BTC: 8,
  ETH: 18,
  EUR: 2,
};

type Props = {
  currency: keyof typeof DECIMALS;
  amount?: number;
};

export const formatMoney = ({ currency, amount }: Props) => {
  const value = !!amount
    ? new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency,
        minimumFractionDigits: DECIMALS[currency],
      })
        .format(amount)
        .replace('BTC', 'Ƀ')
    : '-';

  return value;
};
