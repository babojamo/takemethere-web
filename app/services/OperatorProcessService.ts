import { User } from '@/app/types/users';
import { OperatorProcess } from '../types/operator';

export const OperatorProcessService = {
  getProcesses() {
    return fetch('/demo/data/operator-process.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as OperatorProcess[]);
  },
  getProcess(id: string) {
    return fetch('/demo/data/operator-process.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: OperatorProcess) => r.id == id));
  }
};
