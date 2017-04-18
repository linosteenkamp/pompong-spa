export interface Genre {
  id: number;
  genre: string;
  created_at: string;
  updated_at: string;
  pivot: {
    show_id: number;
    genre_id: number;
  };
}

// "id": 9,
// "genre": "Reality",
// "created_at": "2016-02-01 17:34:36",
// "updated_at": "2016-02-01 17:34:36",
// "pivot": {
//   "show_id": 280009,
//   "genre_id": 9
// }
