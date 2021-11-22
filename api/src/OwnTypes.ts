export const deskState = {
    free: 'free',
    checkedIn: 'checked in',
    reserved: 'reserved',
    unavailable: 'unavailable'
  } as const;

  export interface deskType{
    deskId: string;
    deskState: string;
  }

  export interface User {
    name: string;
    password: string;
  }