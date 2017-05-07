export interface Genre {
  id: number;
  genre: string;
  created_at: string;
  updated_at: string;
  selected: boolean;
  data: {
    show_id: number;
    genre_id: number;
  };
}
