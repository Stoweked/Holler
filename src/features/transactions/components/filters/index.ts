// src/features/transactions/components/filters/index.ts
import { AmountFilter } from "./AmountFilter";
import { ContactFilter } from "./ContactFilter";
import { DateFilterComponent } from "./DateFilter";
import { Options } from "./Options";
import { ProjectFilter } from "./ProjectFilter";
import { SearchFilter } from "./SearchFilter";
import { Sort } from "./Sort";
import { StatusFilter } from "./StatusFilter";
import TransactionFilters from "./TransactionFilters";
import TransactionFiltersDrawer from "./TransactionFiltersDrawer";
import { TypeFilter } from "./TypeFilter";

export const Filters = {
  Amount: AmountFilter,
  Contact: ContactFilter,
  Date: DateFilterComponent,
  Options: Options,
  Project: ProjectFilter,
  Search: SearchFilter,
  Sort: Sort,
  Status: StatusFilter,
  Group: TransactionFilters,
  Drawer: TransactionFiltersDrawer,
  Type: TypeFilter,
};
