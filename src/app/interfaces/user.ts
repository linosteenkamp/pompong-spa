export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  pivot: {
    season_id: number;
    user_id: number;
  };
}
