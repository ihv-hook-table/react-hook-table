const DECIMALS = {
  BTC: 8,
  ETH: 18,
  EUR: 2,
} as const;

type Props = {
  currency: string;
  amount?: number;
};

export const formatMoney = ({ currency, amount }: Props) => {
  const value = amount
    ? new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency,
        minimumFractionDigits: DECIMALS[currency as keyof typeof DECIMALS] || 2,
      })
        .format(amount)
        .replace('BTC', '₿')
    : '-';

  return value;
};
