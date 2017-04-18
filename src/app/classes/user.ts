export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  pivot: {
    season_id: number;
    user_id: number;
  }

}

// "id": 1,
// "name": "Lino Steenkamp",
// "email": "lino@steenkamps.org",
// "created_at": "2016-02-01 16:28:18",
// "updated_at": "2016-02-01 19:03:35",
// "pivot": {
// "season_id": 91248741,
//   "user_id": 1
// }
