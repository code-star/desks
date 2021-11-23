export const deskState = {
  free: "free",
  checkedIn: "checked in",
  reserved: "reserved",
  unavailable: "unavailable",
} as const;

type DeskState = typeof deskState[keyof typeof deskState];

export interface DeskType {
  deskId: string;
  deskState: DeskState;
}

export interface User {
  name: string;
  password: string;
}
