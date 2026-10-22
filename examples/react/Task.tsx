// React Task component. Put sdk.js in <head>.
import { useEffect, useRef } from "react";

declare module "react" { namespace JSX { interface IntrinsicElements { "adsun-task": any } } }

export function Task({ blockId, debug, onReward }: { blockId: string; debug?: boolean; onReward?: (blockId: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const task = ref.current;
    const handler = (e: Event) => onReward?.((e as CustomEvent<string>).detail); // detail = block id
    task?.addEventListener("reward", handler);
    return () => task?.removeEventListener("reward", handler);
  }, [onReward]);
  if (typeof customElements === "undefined" || !customElements.get("adsun-task")) return null;
  return (
    <adsun-task className="task" data-block-id={blockId} data-debug={String(!!debug)} ref={ref}>
      <span slot="reward" className="task__reward">1000 coins</span>
      <div slot="button" className="task__button">go</div>
      <div slot="claim" className="task__button task__button_claim">claim</div>
      <div slot="done" className="task__button task__button_done">done</div>
    </adsun-task>
  );
}
