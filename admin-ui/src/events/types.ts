export enum AppEvents {
  api_error = 'ui.api_error',
}

export interface AppEventsMetadata {
  [AppEvents.api_error]: {
    message: string;
  };
}
