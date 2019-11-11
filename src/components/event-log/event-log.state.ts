export interface EventLogState {
  readonly showEventDetails: boolean;
  readonly toggledEventIds: string[];
}

export const initialEventLogState: EventLogState = {
  showEventDetails: true,
  toggledEventIds: []
};