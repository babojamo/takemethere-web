import { Button } from 'primereact/button';

export enum FormActions {
  BACK = 'back',
  CANCEL = 'cancel',
  UPDATE = 'update',
  SAVE = 'save',
  DELETE = 'delete'
}
interface FormActionProps {
  actions?: string[];
  actionBack?: any;
  actionSave?: any;
  actionDelete?: any;
  actionUpdate?: any;
  actionCancel?: any;
  loadingBack?: boolean;
  loadingSave?: boolean;
  loadingDelete?: boolean;
  loadingUpdate?: boolean;
  loadingCancel?: boolean;
}

const FormAction = ({
  actions,
  actionCancel,
  actionBack,
  actionSave,
  actionDelete,
  actionUpdate,
  loadingBack,
  loadingSave,
  loadingDelete,
  loadingUpdate,
  loadingCancel
}: FormActionProps) => {
  return (
    <div className="flex gap-2">
      {actions?.includes(FormActions.BACK) && (
        <Button loading={loadingBack} onClick={actionBack} type="button" label="Back" severity={'secondary'} icon="pi pi-arrow-left" />
      )}
      {actions?.includes(FormActions.CANCEL) && (
        <Button
          onClick={actionCancel}
          loading={loadingCancel}
          type="button"
          style={{ minWidth: '110px' }}
          label="Cancel"
          severity={'secondary'}
          icon="pi pi-times"
        />
      )}

      {actions?.includes(FormActions.SAVE) && (
        <Button loading={loadingSave} onClick={actionSave} type="submit" severity={'success'} label="Save" icon="pi pi-save" />
      )}
      {actions?.includes(FormActions.UPDATE) && (
        <Button loading={loadingUpdate} onClick={actionUpdate} type="submit" severity={'warning'} label="Update" icon="pi pi-save" />
      )}
      {actions?.includes(FormActions.DELETE) && (
        <Button loading={loadingDelete} onClick={actionDelete} type="submit" label="Delete" icon="pi pi-trash" />
      )}
    </div>
  );
};

export default FormAction;
