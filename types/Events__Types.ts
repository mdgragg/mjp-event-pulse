export type EventStartEnd__Type = {
  StartDateTime: string;
  EndDateTime: string;
};

export interface Event__Type {
  id: string | number;
  event_job: {
    jobId: number;
  };
  EventName: string;
  AuthOptions?: {
    AuthorizationType: string;
  };
  BreakoutSessions?: [any];
  Description?: null | string;
  eventStartEnd: EventStartEnd__Type;
}
