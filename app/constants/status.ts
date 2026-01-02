export enum StatusModel {
  User = 'App\\Models\\User',
  Style = 'App\\Models\\Style'
}

export const STATUSES = {
  USER: {
    ACTIVE: 'active',
    INACTIVE: 'in-active'
  },
  STYLE: {
    COMPLETED: 'completed',
    CREATED: 'created',
    PRODUCTION_RUNNING: 'production-running'
  }
};
