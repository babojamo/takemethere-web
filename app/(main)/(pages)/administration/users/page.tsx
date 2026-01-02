'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ROUTES } from '@/app/constants/routes';
import { User } from '@/app/types/users';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modal/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageHeader from '@/app/components/page-header/component';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import TableHeader from '@/app/components/table-header/component';
import type { Demo } from '@/types';
import UserService from '@/app/services/UserService';
import PrintBarcode from '@/app/components/barcode/PrintBarcode';
import { PRINTING_MODELS } from '@/app/constants/barcode';

interface UserPageState {
  deleteModalShow?: boolean;
  deleteId?: string | number;
  showPrint?: boolean;
}

interface SearchFilter {
  keyword?: string;
}

const UsersPage = () => {
  const [pageState, setPageState] = useState<UserPageState>({});
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<SearchFilter>({});
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const router = useRouter();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ keyword: e.target.value });
  };

  const clearFilter = () => {
    setFilter({
      keyword: ''
    });
    fetchUsers();
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter} searchValue={filter.keyword ?? ''} onSearchChange={handleSearchChange} />;
  };

  const fetchUsers = useCallback(
    async (keyword?: string) => {
      // Abort previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      try {
        const search = keyword?.trim() || filter.keyword?.trim() || '';
        const { data } = await UserService.getUsers(search ? { search } : {}, { signal: controller.signal });
        setUsers(getUsers(data.data));
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      } finally {
        // Only set loading to false if this is the latest controller
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [filter.keyword]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getUsers = (data: User[]) => {
    return [...(data || [])].map((d) => {
      return d;
    });
  };

  const formatDate = (value: Date) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const dateBodyTemplate = (rowData: User) => {
    return formatDate(new Date(rowData.created_at));
  };

  const statusBodyTemplate = (rowData: Demo.Customer) => {
    return <span className={`user-badge status-${rowData.status}`}>{rowData.status}</span>;
  };

  const toolbars = () => {
    return (
      <>
        <Button label="New" onClick={() => router.push(ROUTES.USERS.CREATE)} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
      </>
    );
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.USERS.EDIT}/${id}`);
  };

  const onActionDeleteClick = (id: string | number) => {
    setPageState({
      ...pageState,
      deleteModalShow: true,
      deleteId: id
    });
  };

  const onPrintClick = (user: User) => {
    setSelectedUser(user);
    setPageState({ ...pageState, showPrint: true });
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex flex-row gap-2">
        <Button icon="pi pi-print" outlined rounded onClick={() => onPrintClick(rowData)} size="small" />
        <Button icon="pi pi-pencil" outlined rounded onClick={() => onActionEditClick(rowData.id)} severity="warning" size="small" />
        <Button icon="pi pi-trash" outlined rounded onClick={() => onActionDeleteClick(rowData.id)} severity="danger" size="small" />
      </div>
    );
  };

  const handleDelete = async () => {
    try {
      await UserService.deleteUser(pageState.deleteId as string);
      showSuccess('Department successfully deleted.');
      setPageState({ ...pageState, deleteModalShow: false });
      fetchUsers();
    } catch (error: any) {
      showApiError(error, 'Failed to delete Department.');
    }
  };

  return (
    <>
      <PageHeader titles={['Administration', 'Users']}>
        <PageAction actionAdd={() => router.push(ROUTES.USERS.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>
      <DataTable
        value={users}
        paginator
        className="custom-table p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="id"
        filterDisplay="menu"
        loading={loading}
        emptyMessage={EMPTY_TABLE_MESSAGE}
        header={renderHeader()}
        scrollable
      >
        <Column field="id" header="ID" style={{ minWidth: '12rem' }} />
        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
        <Column field="username" header="Username" style={{ minWidth: '12rem' }} />
        <Column field="role" header="Role" style={{ minWidth: '10rem' }} body={(user: User) => user.role.toUpperCase()} />
        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
        <Column header="Added By" dataType="string" style={{ minWidth: '12rem' }} body={(user: User) => user?.created_by?.name} />
        <Column header="Created At" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
        <Column body={actionBodyTemplate} header="Actions" bodyStyle={{ width: 'auto', whiteSpace: 'nowrap' }} alignFrozen="right" frozen></Column>
      </DataTable>
      <Modal
        title="Delete Record"
        visible={pageState.deleteModalShow}
        onHide={() => setPageState({ ...pageState, deleteModalShow: false })}
        confirmSeverity="danger"
        onConfirm={handleDelete}
      >
        <p>Are you sure you want to delete the record?</p>
      </Modal>
      <PrintBarcode
        visible={pageState.showPrint}
        ids={[selectedUser?.id ?? '']}
        model={PRINTING_MODELS.USER}
        onHide={() => setPageState({ ...pageState, showPrint: false })}
      />
    </>
  );
};

export default UsersPage;
