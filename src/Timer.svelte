<script>
import { createEventDispatcher } from 'svelte';
import { readable, derived } from 'svelte/store';
export let len = 5;

const dispatch = createEventDispatcher();
let mslen = len * 60000;
let endtime = 0;
let ended = false;

function formatDuration(secs) {
  const mins = Math.floor(secs / 60);
  const rem = Math.floor(secs % 60);
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
}

function getDuration(now) {
  if (endtime === 0) {
    return -1;
  }
  const ms = Math.max(endtime - now, 0);
  if (ms < 1000) {
    endtime = 0;
    setTimeout(() => dispatch('ended'), 1000);
  }
  return Math.floor(ms / 1000);
}

function start() {
  ended = false;
  endtime = Date.now() + mslen;
  dispatch('started');
}

const tick = readable(Date.now(), set => {
  const interval = setInterval(() => {
    set(Date.now());
  }, 1000);
  return () => clearInterval(interval);
});
const remaining = derived(tick, ts => getDuration(ts, endtime));
const time = derived(remaining, formatDuration);
</script>
<style>
.timer {
  text-align: center;
  color: #ff3e00;
  font-size: 2rem;
  font-weight: 100;
}

button {
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  border: 0;
  background-color: #ff3e00;
  color: #fff;
  font-size: 1.5rem;
  margin: 0;
}

.wrap {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<div class="wrap">
  {#if $remaining >= 0}
  <div class="timer">
  {$time}
  </div>
  {:else}
  <button type="button" on:click={start}>Start</button>
  {/if}
</div>