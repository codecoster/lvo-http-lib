import { ServerMessage } from './server-message';

export interface User {
  id: string;
  name: string;
  messages?: ServerMessage;
}
