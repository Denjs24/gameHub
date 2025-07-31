export type LinkType = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    childrens?: LinkType[];
}

export type PlatformsType = {
  platform: PlatformType,
  released_at?: string,
  requirements?: {
    minimum?: string,
    recommended?: string
  }
}

export type PlatformType = {
    id: number,
    name: string,
    slug: string,
    image: string,
    year_end: number,
    year_start: number,
    games_count: number,
    image_background: string,
}

export type GenreType = {
  id: number,
  name: string,
  slug: string,
  games_count: number,
  image_background: string,
}

export type TagType = {
  id: number,
  name: string,
  slug: string,
  language: 'string',
  games_count: number,
  image_background: string,
}

export type PublisherType = {
  id: number,
  name: string,
  slug: string,
  games_count: number,
  image_background: string,
}

export type DeveloperType = {
  id: number,
  name: string,
  slug: string,
  games_count: number,
  image_background: string,
}

export type ParentPlatformType = {
  platform: {
    id: number,
    name: string,
    slug: string,
  }
}

export type GameType = {
    id: number,
    slug: string,
    name: string,
    released: string,
    tba: boolean,
    background_image: string,
    rating?: number,
    rating_top?: number,
    screenshots_count?: number;
    ratings?: {
      id: number,
      title: string,
      count: number,
      percent: number,
    }[],
    ratings_count?: number,
    reviews_text_count?: string,
    added?: number,
    added_by_status?: {
      yet: number,
      owned: number,
      toplay: number,
      dropped: number,
      playing: number,
    },
    metacritic?: number,
    playtime?: number,
    suggestions_count?: number,
    updated?: Date,
    esrb_rating?: {
      id: number,
      slug: string,
      name: string
    },
    movies_count?: number
    platforms?: PlatformsType[],
    genres?: GenreType[],
    tags?: TagType[],
    publishers?: PublisherType[],
    developers?: DeveloperType[],
    parent_platforms?: ParentPlatformType[],
}

export type Platform = {
  id?: number;
  name: string;
  slug?: string;
  games_count?: number;
  image_background?: string;
  image?: string;
  year_start?: string;
  year_end?: string;
}

export type PlatformList = {
  count: number;
  next?: string;
  previous?: string;
  results: Platform[];
}

export type ScreenShotType = {
  id: number;
  image: string,
  width: number;
  height: number;
  is_deleted: boolean;
}