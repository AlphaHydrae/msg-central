export interface EventLogState {
  readonly expandedEventIds: string[];
}

export const initialEventLogState: EventLogState = {
  expandedEventIds: []
};