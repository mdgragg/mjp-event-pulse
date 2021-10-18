export type EventStartEnd__Type = {
  StartDateTime: Date;
  EndDateTime:  Date ;
};

export interface Event_Job {
  id: number;
  jobId: string | number;
  client: any;
  EventJobName: string;
  DriveFolder: string;
}
export interface Event__Type {
  id: string | number;
  EventName: string;
isMainEvent: boolean;
client: any;
slug: string;
created_at: Date;
updated_at: Date;
Description?: null | string;

  event_job: {
    jobId: number;
  };
  AuthOptions?: {
    AuthorizationType: string;
  };
  BreakoutSessions?: [any];
  eventStartEnd: EventStartEnd__Type;
}
