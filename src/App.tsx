import './App.css';

import { HookTableExample } from './examples/HookTableExample';
import { formatMoney } from './examples/value-format/format-money';
import { TableContext, TableContextType } from './hook-table';

type MoneyType = {
  currency: string;
  amount: number;
};

const ctx: TableContextType = {
  moneyFormat: money => formatMoney(money as MoneyType),
};

function App() {
  return (
    <TableContext.Provider value={ctx}>
      <HookTableExample />
    </TableContext.Provider>
  );
}

export default App;
