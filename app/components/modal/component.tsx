import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface ModalProps {
  visible?: boolean;
  onHide?: any;
  onConfirm?: any;
  children?: any;
  title?: string;
  confirmSeverity?: 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'help' | undefined;
  cancelSeverity?: 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'help' | undefined;
  hideActions?: boolean;
  width?: string;
  minWidth?: string;
}

const Modal = ({
  visible,
  onHide,
  onConfirm,
  children,
  title,
  confirmSeverity = 'success',
  width,
  minWidth,
  cancelSeverity = 'secondary',
  hideActions = false
}: ModalProps) => {
  return (
    <Dialog header={title} visible={visible} onHide={onHide} style={{ width, minWidth }}>
      {children}
      {!hideActions && (
        <div className="flex">
          <div className="ml-auto">
            <Button onClick={onConfirm} icon="pi pi-check" severity={confirmSeverity} label="Confirm" className="mr-2" />
            <Button onClick={onHide} icon="pi pi-times" severity={cancelSeverity} label="Cancel" />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default Modal;
