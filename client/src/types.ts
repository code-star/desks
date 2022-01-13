export const deskState = {
  free: "free",
  checkedIn: "checked in",
  reserved: "reserved",
  unavailable: "unavailable",
} as const;

type DeskState = typeof deskState[keyof typeof deskState];

export interface DeskType {
  desk_id: string;
  desk_state: DeskState;
}

export interface User {
  name: string;
  password: string;
}
export interface Booking {
  booking_id: string;
  start_time: number;
  end_time: number;
  booked_desk: string;
  user_name: string;
}
