import type { Meta, StoryObj } from "@storybook/react";
import { HookTableExample as TableComponent } from "./examples/HookTableExample";

const meta: Meta<typeof TableComponent> = {
  title: "HookTable",
  component: TableComponent,
  subcomponents: {},
};

export default meta;

type Story = StoryObj<typeof TableComponent>;

export const HookTable: Story = {};
