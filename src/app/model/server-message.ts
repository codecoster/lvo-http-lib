export interface ServerMessage {
  ref: string;
  value?: any;
  text?: string;
  code?: string;
  severity: string;
}
