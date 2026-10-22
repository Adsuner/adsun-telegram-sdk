// Adsun Publisher SDK typings. Docs: https://adsun.io/docs
export interface ShowPromiseResult {
  done: boolean; // true if the user watched till the end
  description: string;
  state: "load" | "render" | "playing" | "destroy";
  error: boolean;
}
export type BannerType = "RewardedVideo" | "FullscreenMedia";
// Block ids: Reward "50001", Interstitial "int-50001", Task "task-50001"
export interface AdsunInitParams {
  blockId: string;
  debug?: boolean;
  hasReward?: boolean;
  debugConsole?: boolean;
  debugBannerType?: BannerType;
  forceCampaignId?: string;
  apiUrl?: string;
}
export type EventType = "onReward" | "onComplete" | "onStart" | "onSkip" | "onBannerNotFound" | "onNonStopShow" | "onTooLongSession" | "onError" | "onNotSuitable" | "onShowNextBanner" | "onProgress" | "onBannerClick" | "onSkippable";
export type HandlerType = () => void;
export interface AdController {
  show(): Promise<ShowPromiseResult>;
  addEventListener(event: EventType, handler: HandlerType): void;
  removeEventListener(event: EventType, handler: HandlerType): void;
  destroy(): void;
  showNextBanner(): boolean;
}
declare global {
  interface Window {
    Adsun?: { version: string; init(params: AdsunInitParams): AdController };
  }
}
