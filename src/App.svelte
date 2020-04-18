<script>
  import Timer from './Timer.svelte';
  import { ShuffableArray } from './shuffle';
  export let topics;

  let currentTopic = '';

  let allTopics = new ShuffableArray(topics);

  function newTopic() {
    currentTopic = allTopics.shuffleNext();
  }

  function stop() {
    currentTopic = '';
  }
</script>

<main>
  {#if currentTopic}<div class="topic">{currentTopic}</div>{/if}
  <Timer len={5} on:started={newTopic} on:ended={stop}/>
</main>
<h1>TOPICS</h1>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    margin: 1rem;
    min-height: 50vh;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
  }

  .topic {
    text-align: center;
    color: #ff3e00;
    font-size: 2rem;
    font-weight: 100;
    margin-top: 0;
    margin-bottom: 3rem;
  }
  h1 {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 900;
    font-size: 4rem;
    color: rgba(0, 0, 0, 0.1);
    margin: 0;
    line-height: 0.7;
  }

  @media (min-width: 640px) {
    main {
      max-width: 640px;
      padding: 2rem;
    }
  }
</style>