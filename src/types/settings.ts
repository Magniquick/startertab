import {
  Booking,
  FavoriteLink,
  RSSFeed,
  SearchEngineDefault,
  TodoObject,
} from "@/types/tiles";
import { Layouts } from "react-grid-layout";

export type Option = {
  title: string;
  subTitle: string;
  localStorageId: string;
  optionType: OptionType;
};

export type OptionType =
  | "BackgroundBlurSlide"
  | "BorderRadiusInput"
  | "BorderSelect"
  | "CityInputForUV"
  | "CityInputForWeather"
  | "ColorPicker"
  | "DefaultSearchEngine"
  | "DropShadowInput"
  | "FontFamilyInput"
  | "GridGapInput"
  | "HackerNewsFeedType"
  | "LargeTileTypePicker"
  | "LongTileTypePicker"
  | "LargeStockTile"
  | "StockGraphInput"
  | "MediumTileTypePicker"
  | "RandomizeColors"
  | "SmallStockInput"
  | "SmallTileTypePicker"
  | "SpotifyControllingBackgroundSwitch"
  | "SpotifyTopArtistsTimeLength"
  | "SpotifyMediaControlSwitch"
  | "SubRedditPicker"
  | "SubRedditOffset"
  | "TimeTileShowingSecondsSwitch"
  | "TimeTileShowingTimerSwitch"
  | "TimeTileShowing12HourSwitch"
  | "TitleForFavorites"
  | "TitleForRSSFeed";

export const TileTypes = [
  "Reddit Feed",
  "Hacker News Feed",
  "Strava Graph",
  "Search Bar",
  "Bonsai",
  "Small Weather Tile",
  "Large Weather Tile",
  "UV Graph",
  "Day Planner",
  "Theme Picker",
  "Small Spotify Tile",
  "Time",
  "Twitter Feed Tile",
  "Markdown File Tile",
  "Todo List",
  "Large Spotify Tile",
  "Small Stock Tile",
  "Stock Graph Tile",
  "Large Stock Tile",
  "Spotify Top Artist Tile",
  "Blank Tile",
  "Favorite Links Tile",
  "RSS Feed Tile",
  "Outlook Meetings Tile",
  "Google Meetings Tile",
  "None",
] as const;

export type TileType = (typeof TileTypes)[number];

export type TileSettingsKey = keyof TileSettings;

export type TileSize = "small" | "large" | "medium" | "long";

export type TileSettings = {
  backgroundColor: string;
  bonsaiBaseColor?: string;
  bonsaiTrunkColor?: string;
  borderColor?: string;
  borderRadius?: string;
  bookings?: Booking[];
  cityForUv?: string;
  cityForWeather?: string;
  defaultSearchEngine?: SearchEngineDefault;
  dropShadow?: string;
  favoriteLinks?: FavoriteLink[];
  favoriteLinksTitle?: string;
  fontFamily?: string;
  globalBackgroundBlur?: number;
  globalTileBackgroundColor?: string;
  globalTileTextColor?: string;
  graphStock?: string;
  gridGap?: string;
  hackerNewsFeedType?: string;
  markdownFileText?: string;
  rssFeedTitle?: string;
  rssFeeds?: RSSFeed[];
  sidebarBackgroundColor?: string;
  sidebarBorderColor?: string;
  spotifyArtistSearchTimeLength?: string;
  spotifyControllingBackground?: boolean;
  spotifyMediaControlsShowing?: boolean;
  stockName?: string;
  stravaToken?: string;
  subReddit?: string;
  subRedditOffset?: number;
  subRedditSortType?: string;
  subTextColor?: string;
  tempDisplayInCelsius?: string;
  themePickerBubbleColor?: string;
  tileBorder?: string;
  tileId: number;
  tileSize: TileSize;
  tileType: TileType;
  textColor: string;
  timeTileShowing12Hour?: boolean;
  timeTileShowingSeconds?: boolean;
  timeTileShowingTimer?: boolean;
  todoList?: TodoObject[];
  twitterFeedURL?: string;
};

export type ThemeSettings = {
  downloadedFromMarketplace: boolean;
  globalSettings: TileSettings;
  themeName: string;
  tileLayout: Layouts;
  tiles: TileSettings[];
};

export type UserSettings = {
  themes: ThemeSettings[];
  systemThemeSettings: SystemThemeSettings;
};

// used for toggling using the system's dark/light theme preferences to control the tab's theme
export type SystemThemeSettings = {
  usingSystemTheme: boolean;
  currentThemeName: string;
  lightTheme: string;
  darkTheme: string;
};
