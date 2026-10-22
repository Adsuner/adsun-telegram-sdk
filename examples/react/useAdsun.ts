// React hook: const show = useAdsun({ blockId: "tw-50001", onReward: () => addCoins(10) });
import { useCallback, useEffect, useRef } from "react";
import type { AdController, ShowPromiseResult, AdsunInitParams } from "../../types/adsun";

export function useAdsun({ onReward, onError, ...params }: AdsunInitParams & { onReward?: () => void; onError?: (r: ShowPromiseResult) => void }) {
  const ref = useRef<AdController>();
  useEffect(() => { ref.current = window.Adsun?.init(params); }, [params.blockId, params.debug]);
  return useCallback(() => {
    if (!ref.current) {
      // Same shape as the AdsGram docs: onError gets a ShowPromiseResult when the script is missing.
      const r: ShowPromiseResult = { error: true, done: false, state: "load", description: "Adsun script not loaded" };
      onError?.(r);
      return Promise.reject(r);
    }
    return ref.current.show().then((r) => { onReward?.(); return r; }).catch((r: ShowPromiseResult) => { onError?.(r); throw r; });
  }, [onReward, onError]);
}
