'use client';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { BuyerForm } from '@/app/types/buyers';
import { BuyerService } from '@/app/services/BuyerService';
import { ROUTES } from '@/app/constants/routes';
import { useBuyerPage } from '../../hooks/useBuyerPage';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormBuyer from '@/app/components/buyers/FormBuyer';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import PageCard from '@/app/components/page-card/component';
import React, { useContext, useCallback, useEffect, useState } from 'react';

interface EditBuyerPageProps {
  params?: { id: any };
}

const EditBuyerPage = ({ params }: EditBuyerPageProps) => {
  const router = useRouter();
  const { updateBuyer, isSaveLoading, isFetching, setIsFetching } = useBuyerPage();
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const [buyer, setBuyer] = useState<BuyerForm | undefined>();

  const getBuyer = useCallback(async () => {
    try {
      setIsFetching(true);
      setBuyer((await BuyerService.getBuyer(params?.id)).data as BuyerForm);
    } catch (error) {
      showApiError(error, 'Failed fetch buyer.');
    } finally {
      setIsFetching(false);
    }
  }, [params?.id]);

  const handleSubmit = async (data: BuyerForm) => {
    try {
      await updateBuyer(params?.id as string, data);
      showSuccess('Buyer successfully saved.');
      setTimeout(() => {
        router.push(ROUTES.BUYER.INDEX);
      }, 2000);
    } catch (error: any) {
      showApiError(error, 'Failed to save buyer.');
    }
  };

  useEffect(() => {
    if (params?.id) {
      getBuyer();
    }
  }, [params?.id, getBuyer]);

  return (
    <div className="grid justify-content-start">
      <div className="col-12 lg:col-6">
        <PageCard title="Edit Buyer" toolbar={<PageAction actionBack={() => router.push(ROUTES.BUYER.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormBuyer value={buyer} onSubmit={handleSubmit}>
                  <div className="flex">
                    <div className="ml-auto">
                      <FormAction
                        loadingUpdate={isSaveLoading || isFetching}
                        actionCancel={() => router.push(ROUTES.BUYER.INDEX)}
                        actions={[FormActions.CANCEL, FormActions.UPDATE]}
                      />
                    </div>
                  </div>
                </FormBuyer>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default EditBuyerPage;
