<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  export let len = 5;

  const labels = {
    true: 'Stop',
    false: 'Start',
  };

  const dispatch = createEventDispatcher();
  $: mslen = len * 60000;
  let lastTime;
  let elapsed = 0;


  function formatDuration(ms) {
    const secs = Math.floor(ms / 1000);
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  }

  $: timeStr = formatDuration(mslen - elapsed);
  let frame; 
  let enabled = false;
  $: label = labels[enabled.toString()];

function countdown() {
  if (!enabled) {
    cancelAnimationFrame(frame);
    return;
  }
  frame = requestAnimationFrame(countdown);

  const time = window.performance.now();
  elapsed += Math.min(
    time - lastTime,
    mslen - elapsed
  );
  if (elapsed === mslen) {
    toggle();
  }
  lastTime = time;
}

onDestroy(() => cancelAnimationFrame(frame));

function toggle() {
  enabled = !enabled;
  if (enabled) {
    lastTime = window.performance.now();
    dispatch('started');
    countdown();
  } else {
    dispatch('ended');
    elapsed = 0;
  }
}
</script>

<div class="wrap">
  {#if enabled}
  <div class="timer">
  {timeStr}
  </div>
  {/if}
  <button type="button" on:click={toggle}>{label}</button>
</div>

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
    flex-direction: column;
    gap: 1rem;
  }
</style>