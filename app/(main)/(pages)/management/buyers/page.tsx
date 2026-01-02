'use client';

import { Button } from 'primereact/button';
import { Buyer } from '@/app/types/buyers';
import { BuyerService } from '@/app/services/BuyerService';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import CustomDatatable from '@/app/components/datatable/component';
import Modal from '@/app/components/modal/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageHeader from '@/app/components/page-header/component';
import PageTile from '@/app/components/page-title/component';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import TableHeader from '@/app/components/table-header/component';
import useDatatable from '@/app/hooks/useDatatable';

interface BuyerPageState {
  deleteModalShow?: boolean;
  deleteId?: string | number;
}

const BuyersPage = () => {
  const [pageState, setPageState] = useState<BuyerPageState>({});
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const { clearFilter, handleOnPageChange, filters, tableLoading, first, rows, setFilters, setTableLoading, setTotalRecords, totalRecords } =
    useDatatable();

  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const renderHeader = () => {
    return <TableHeader onClear={clearFilter} searchValue={filters.search ?? ''} onSearchChange={handleSearchChange} />;
  };

  const fetchBuyers = useCallback(async () => {
    // Abort previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setTableLoading(true);
    try {
      const params = {
        search: filters.search,
        page: filters.page,
        per_page: filters.per_page
      };

      const data = await BuyerService.getBuyers(params, { signal: controller.signal });
      setTotalRecords(data.data.total ?? 0);
      setBuyers(getBuyers(data.data.data ?? []));
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    } finally {
      // Only set loading to false if this is the latest controller
      if (abortControllerRef.current === controller) {
        setTableLoading(false);
      }
    }
  }, [filters]);

  useEffect(() => {
    fetchBuyers();
  }, [fetchBuyers]);

  const getBuyers = (data: Buyer[]) => {
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

  const dateBodyTemplate = (rowData: Buyer) => {
    return formatDate(new Date(rowData.created_at));
  };

  const imageBodyTemplate = (rowData: Buyer) => {
    return (
      <>
        {rowData?.buyer_logo_path && (
          <Image
            src={rowData.buyer_logo_path}
            alt={rowData.name}
            imageStyle={{ width: 50, height: 50, objectFit: 'cover' }}
            preview // opens a lightbox on click
          />
        )}
      </>
    );
  };

  const onActionEditClick = (id: string | number) => {
    router.push(`${ROUTES.BUYER.EDIT}/${id}`);
  };

  const onActionDeleteClick = (id: string | number) => {
    setPageState({
      ...pageState,
      deleteModalShow: true,
      deleteId: id
    });
  };

  const actionBodyTemplate = (rowData: Buyer) => {
    return (
      <>
        <Button icon="pi pi-pencil" outlined rounded onClick={() => onActionEditClick(rowData.id)} severity="warning" className="mr-2" />
        <Button icon="pi pi-trash" outlined rounded onClick={() => onActionDeleteClick(rowData.id)} severity="danger" />
      </>
    );
  };

  const handleDelete = async () => {
    try {
      await BuyerService.deleteBuyer(pageState.deleteId as string);
      showSuccess('Buyer successfully deleted.');
      setPageState({ ...pageState, deleteModalShow: false });
      fetchBuyers();
    } catch (error: any) {
      showApiError(error, 'Failed to delete buyer.');
    }
  };

  return (
    <>
      <PageTile title="Buyers" icon="pi pi-fw pi-cog" url={ROUTES.BUYER.INDEX} />
      <PageHeader titles={['Management', 'Buyers']}>
        <PageAction actionAdd={() => router.push(ROUTES.BUYER.CREATE)} actions={[PageActions.ADD]} />
      </PageHeader>

      <CustomDatatable
        value={buyers}
        header={renderHeader()}
        loading={tableLoading}
        onPage={handleOnPageChange}
        first={first}
        rows={rows}
        totalRecords={totalRecords}
      >
        <Column field="id" header="ID" />
        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
        <Column header="Logo" field="buyer_logo_path" style={{ minWidth: '10rem' }} body={imageBodyTemplate} />
        <Column header="Added By" dataType="string" style={{ minWidth: '12rem' }} body={(buyer: Buyer) => buyer?.created_by?.name} />
        <Column header="Created At" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
        <Column header="Actions" body={actionBodyTemplate} bodyStyle={{ width: 'auto', whiteSpace: 'nowrap' }} alignFrozen="right" frozen></Column>
      </CustomDatatable>
      <Modal
        title="Delete Record"
        visible={pageState.deleteModalShow}
        onHide={() => setPageState({ ...pageState, deleteModalShow: false })}
        confirmSeverity="danger"
        onConfirm={() => handleDelete()}
      >
        <p>Are you sure you want to delete the record?</p>
      </Modal>
    </>
  );
};

export default BuyersPage;
