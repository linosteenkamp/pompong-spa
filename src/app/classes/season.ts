import {User} from "./user";

export interface Season {
  id: number;
  show_id : number;
  season: number;
  file_size: number;
  selected: boolean;
  users: Array<User>;
}
