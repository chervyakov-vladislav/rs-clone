import {
  ExtendedSearchResultItem,
  IFilmData,
  ITopFilm,
  KeyWordSearchInterface,
  SearchQuerryOptions,
  IStaff,
  IReviewsData,
  PostersInfoInterface,
  PostersInfoArray,
} from './response-data';

export interface StateInterface {
  premiere: IFilmData | null;
  movieData: IFilmData | null;
  movieStaff: IStaff[];
  movieReviews: IReviewsData | null;
  films: ITopFilm[];
  best: ITopFilm[];
  player: Record<string, string>;
  iframe: HTMLElement;
  moviePage: {
    pageID: string;
    currentData: IFilmData | null;
  };
  previousPageInfo: PreviousPageInfoInterface;
  search: {
    searchResult: KeyWordSearchInterface | null;
    searchTopResult: ITopFilm[];
    searchExtendedResult: ExtendedSearchResultItem[];
    searchKeywordValue: string;
    searchFilmsCountResult: number;
    searchMaxPages: number;
    searchNextPage: number;
    searchStatus: 'search' | 'top' | 'yearSearch';
    searchTopStatus: 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS';
    filterOptions: SearchQuerryOptions;
  };
  account: {
    userData: UserData;
    watchLaterFilms: number[];
    likedFilms: number[];
  };
  wallpapers: {
    wallpapers: PostersInfoInterface | null;
    posters: PostersInfoInterface | null;
    fanArt: PostersInfoInterface | null;
    photoBank: PostersInfoArray[];
  };
}

export interface PreviousPageInfoInterface {
  currentPageHash?: string;
  currentPageID?: string;
  previousPageHash?: string;
  previousPageID?: string;
}

export interface UserData {
  logged: boolean;
  userLogin: string;
  userName: string;
  userToken: string;
  userPhoto: File | string;
}

export interface UserDataParams {
  logged?: boolean;
  userLogin?: string;
  userName?: string;
  userToken?: string;
  userPhoto?: File | string;
}
