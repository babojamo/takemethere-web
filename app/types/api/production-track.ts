export interface StoreProductionTrackPayload {
  tracks: {
    id?: string | boolean;
    date: string;
    section_id: string;
    operator_id: string;
    classification: string;
    process_id: string;
    style_id: string;
    target: number | string;
    time: number | string;
    remarks: string;
  }[];
  delete_tracks?: string[];
}

export interface GetProductionTrackPayload {
  track_date: string;
  process_ids?: any[];
}
