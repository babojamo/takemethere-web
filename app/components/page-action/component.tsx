import { Button } from 'primereact/button';

export enum PageActions {
  BACK = 'back',
  ADD = 'add',
  UPLAOD = 'upload'
}
interface PageActionProps {
  actions?: string[];
  actionBack?: any;
  actionAdd?: any;
  actionUpload?: any;
  children?: any;
}

const PageAction = ({ actions, actionBack, actionAdd, actionUpload, children }: PageActionProps) => {
  return (
    <>
      {actions?.includes(PageActions.BACK) && (
        <Button onClick={actionBack} outlined severity="secondary" label="Back" icon="pi pi-arrow-left" style={{ marginRight: '.5em' }} />
      )}
      {actions?.includes(PageActions.ADD) && <Button onClick={actionAdd} label="New" icon="pi pi-plus" style={{ marginRight: '.5em' }} />}
      {actions?.includes(PageActions.UPLAOD) && (
        <Button onClick={actionUpload} severity="help" label="Upload" icon="pi pi-upload" style={{ marginRight: '.5em' }} />
      )}
      {children}
    </>
  );
};

export default PageAction;
