// This interface can represent any entity that can receive funds
export interface Recipient {
  name: string;
  avatar: string;
  details: string;
}

// You can still have a specific Contact type if needed, which extends Recipient
export interface Contact extends Recipient {
  topContact?: boolean;
}
