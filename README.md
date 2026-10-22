# Adsun Telegram SDK — examples

Monetize your **Telegram Mini App** with rewarded, interstitial and task ads from [Adsun](https://adsun.io), an independent Telegram ad network. Publishers earn **USDT**.

- Website: https://adsun.io
- SDK docs: https://adsun.io/docs
- Mini App monetization guide: https://adsun.io/telegram-mini-app-monetization
- Support: support@adsun.io · Telegram [@ADSunSupport](https://t.me/ADSunSupport) · Channel [t.me/adsunio](https://t.me/adsunio)

> Adsun is not affiliated with Telegram's official Ad Platform.

## 1. Get a block ID
Create a free publisher account at [adsun.io](https://adsun.io/publishers), add your Mini App and create a Reward, Interstitial or Task block.

## 2. Load the SDK
```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://api.adsun.io/sdk.js"></script>
```

## 3. Rewarded / interstitial ad
```js
const ad = window.Adsun.init({ blockId: "YOUR_BLOCK_ID", debug: true });

ad.show()
  .then(() => { /* watched to the end */ })
  .catch((r) => { /* skipped, no ad or error: r.description */ });
```
Set `debug: true` while testing (test ad, no stats, no Reward URL). Interstitial block IDs start with `int-`.

## 4. Task ad
```html
<adsun-task data-block-id="task-YOUR_BLOCK_ID">
  <span slot="reward">+100 coins</span>
</adsun-task>
<script>
  const t = document.querySelector("adsun-task");
  t.addEventListener("reward", (e) => console.log("task done", e.detail));
  t.addEventListener("onBannerNotFound", () => t.remove());
</script>
```

## 5. Grant rewards on your server (recommended)
In the Adsun panel set a Reward URL such as `https://yourgame.com/reward?userid=[userId]`. Adsun calls it only after a server-verified full watch or task claim. Grant rewards from this callback, not from the client `.then()` alone. See [`examples/server/reward-callback.js`](examples/server/reward-callback.js).

## Events
`onStart`, `onSkip`, `onReward`, `onComplete`, `onError`, `onBannerNotFound`, `onNonStopShow`, `onTooLongSession`

## Examples in this repo
| File | What |
| --- | --- |
| [`examples/vanilla.html`](examples/vanilla.html) | Plain HTML/JS Mini App |
| [`examples/react/useAdsun.ts`](examples/react/useAdsun.ts) | React hook |
| [`examples/react/Task.tsx`](examples/react/Task.tsx) | React task block |
| [`examples/vue/useAdsun.vue.ts`](examples/vue/useAdsun.vue.ts) | Vue composable |
| [`examples/unity/Adsun.jslib`](examples/unity/Adsun.jslib) | Unity WebGL bridge |
| [`examples/server/reward-callback.js`](examples/server/reward-callback.js) | Node.js Reward URL handler |
| [`types/adsun.d.ts`](types/adsun.d.ts) | TypeScript types |

## Reward ideas
Booster multipliers · "one more life" after game over · ads as currency to top up a balance · an "Earn" page with tasks.

Learn more: [Rewarded ads](https://adsun.io/rewarded-ads) · [Interstitial ads](https://adsun.io/interstitial-ads) · [Task ads](https://adsun.io/telegram-task-ads) · [Bot monetization](https://adsun.io/telegram-bot-monetization)

MIT License
