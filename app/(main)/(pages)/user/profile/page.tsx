'use client';

import FormAction, { FormActions } from '@/app/components/form-action/component';
import PageCard from '@/app/components/page-card/component';
import FormUserProfile from '@/app/components/user-profile/FormUserProfile';
import { useUserProfilePage } from './hooks/useUserProfilePage';
import { useCallback, useEffect, useState } from 'react';
import { UserForm } from '@/app/types/users';
import { useAuth } from '@/app/contexts/useAuth';
import { get } from 'http';
import UserService from '@/app/services/UserService';
import { SelectItem } from 'primereact/selectitem';

const UserProfile = () => {
  const { updateUserAccount, isSaveLoading } = useUserProfilePage();
  const [userData, setUserData] = useState<UserForm | undefined>();
  const { user } = useAuth();

  const userTypes: SelectItem[] = [
    { label: 'Operator', value: 'operator' },
    { label: 'Administrator', value: 'administrator' },
    { label: 'Administrator', value: 'manager' }
  ];

  const getUserData = useCallback(async () => {
    if (!user?.email) return;

    const res = await UserService.getMe();
    if (res.data) {
      setUserData(res.data as UserForm);
    }
  }, [user?.email]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="grid justify-content-start">
      <div className="col-12 lg:col-6">
        <PageCard title="Edit Profile">
          <div className="grid">
            <div className="col-12">
              <div className="p-fluid">
                <FormUserProfile value={userData} userTypes={userTypes} onSubmit={updateUserAccount}>
                  <div className="flex">
                    <div className="ml-auto">
                      <FormAction loadingSave={isSaveLoading} actions={[FormActions.SAVE]} />
                    </div>
                  </div>
                </FormUserProfile>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default UserProfile;
