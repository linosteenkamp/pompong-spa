// import {Genre} from "./genre";
// import {Season} from "./season";

import { Genre }  from "./genre";
import { Season } from "./season";

export interface Show {
  id: number;
  lang: string;
  network: string;
  quality: string;
  show_name: string;
  status: string;
  tvdb_id: number;
  image_url: string;
  overview: string;
  location: string;
  max_season: number;
  created_at: string;
  updated_at: string;
  display_card: boolean;
  display_overview: boolean;
  genres: Array<Genre>;
  seasons: Array<Season>;
  file_size: number;
  selected_file_size: number;
}
