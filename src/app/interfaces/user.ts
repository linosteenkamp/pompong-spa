export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  data: {
    season_id: number;
    user_id: number;
  };
}
