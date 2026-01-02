'use client';
import React, { useContext } from 'react';
import PageCard from '@/app/components/page-card/component';
import PageAction, { PageActions } from '@/app/components/page-action/component';
import { ROUTES } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import FormAction, { FormActions } from '@/app/components/form-action/component';
import FormBuyer from '@/app/components/buyers/FormBuyer';
import { useBuyerPage } from '../hooks/useBuyerPage';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { DefaultFormData } from '@/app/types/form';

const CreateBuyerPage = () => {
  const router = useRouter();

  const { saveBuyer, isSaveLoading } = useBuyerPage();
  const { showApiError, showSuccess } = useContext(LayoutContext);

  const handleSubmit = async (data: DefaultFormData) => {
    try {
      await saveBuyer(data);
      showSuccess('Buyer successfully saved.');
      setTimeout(() => {
        router.push(ROUTES.BUYER.INDEX);
      }, 2000);
    } catch (error: any) {
      showApiError(error, 'Failed to save buyer.');
    }
  };

  return (
    <div className="grid justify-content-start">
      <div className="col-12 lg:col-6">
        <PageCard title="Create Buyer" toolbar={<PageAction actionBack={() => router.push(ROUTES.BUYER.INDEX)} actions={[PageActions.BACK]} />}>
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormBuyer onSubmit={handleSubmit}>
                  <div className="flex">
                    <div className="ml-auto">
                      <FormAction
                        loadingSave={isSaveLoading}
                        actionCancel={() => router.push(ROUTES.BUYER.INDEX)}
                        actions={[FormActions.CANCEL, FormActions.SAVE]}
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

export default CreateBuyerPage;
