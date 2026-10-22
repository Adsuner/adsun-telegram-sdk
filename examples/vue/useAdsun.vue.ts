// Vue 3 composable: const showAd = useAdsun({ blockId: "50001", onReward, onError })
import { onMounted, shallowRef } from "vue";
import type { AdController, ShowPromiseResult, AdsunInitParams } from "../../types/adsun";

export function useAdsun({ onReward, onError, ...params }: AdsunInitParams & { onReward?: () => void; onError?: (r: ShowPromiseResult) => void }) {
  const ctrl = shallowRef<AdController>();
  onMounted(() => { ctrl.value = window.Adsun?.init(params); });
  return async () => {
    if (!ctrl.value) return onError?.({ error: true, done: false, state: "load", description: "Adsun script not loaded" });
    try { await ctrl.value.show(); onReward?.(); } catch (r) { onError?.(r as ShowPromiseResult); }
  };
}
