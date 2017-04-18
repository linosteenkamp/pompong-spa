import {User} from "./user";

export interface Season {
  id: number;
  show_id : number;
  season: number;
  file_size: number;
  selected: boolean;
  users: Array<User>;
}

// "id": 91280009,
// "show_id": 280009,
// "season": 1,
// "file_size": "4617081146",
// "users": []

