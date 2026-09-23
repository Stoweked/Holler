import { lazy, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import TransactionFilters from "./filters/TransactionFilters";
import { TransactionsTableView } from "./TransactionsTableView";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import { useContacts } from "@/features/contacts/contexts/ContactsContext";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { Transaction } from "@/features/transactions/types/transaction";
import { ClientOnly } from "@/components/shared/ClientOnly";
import { useTransactionFilters } from "../hooks/useTransactionFilters";

const TransactionDetailsDrawer = lazy(
  () => import("./TransactionDetailsDrawer")
);

export default function TransactionsTable() {
  const { profile } = useProfile();
  const { contacts } = useContacts();
  const { projects } = useProjects();
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const {
    activeStatusFilter,
    setActiveStatusFilter,
    activeTypeFilter,
    setActiveTypeFilter,
    sortOption,
    setSortOption,
    dateFilter,
    setDateFilter,
    amountRange,
    setAmountRange,
    activeContactFilter,
    setActiveContactFilter,
    activeProjectFilter,
    setActiveProjectFilter,
    searchQuery,
    setSearchQuery,
    processedTransactions,
    resetFilters,
    activeProjectName,
    loading,
  } = useTransactionFilters();

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    openDrawer();
  };

  const isAnyFilterActive =
    activeStatusFilter !== "All" ||
    activeTypeFilter !== "All" ||
    dateFilter !== "All" ||
    activeContactFilter !== "All" ||
    activeProjectFilter !== "All" ||
    amountRange[0] !== 0 ||
    amountRange[1] !== 999999 ||
    searchQuery.length > 0;

  return (
    <>
      <TransactionsTableView
        transactions={processedTransactions}
        profile={profile}
        loading={loading}
        hasActiveFilters={isAnyFilterActive}
        onResetFilters={resetFilters}
        onTransactionClick={handleTransactionClick}
        toolbar={
          <TransactionFilters
            contacts={contacts}
            projects={projects}
            activeStatusFilter={activeStatusFilter}
            onStatusFilterChange={setActiveStatusFilter}
            activeTypeFilter={activeTypeFilter}
            onTypeFilterChange={setActiveTypeFilter}
            activeSortOption={sortOption}
            onSortChange={setSortOption}
            activeDateFilter={dateFilter}
            onDateChange={setDateFilter}
            activeAmountFilter={amountRange}
            onAmountFilterChange={setAmountRange}
            activeContactFilter={activeContactFilter}
            onContactFilterChange={setActiveContactFilter}
            activeProjectFilter={activeProjectFilter}
            activeProjectName={activeProjectName}
            onProjectFilterChange={setActiveProjectFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            resetFilters={resetFilters}
            total={processedTransactions.length}
          />
        }
      />

      <ClientOnly>
        <TransactionDetailsDrawer
          opened={drawerOpened}
          close={closeDrawer}
          transaction={selectedTransaction}
        />
      </ClientOnly>
    </>
  );
}
