
function shuffledOffsets(len) {
  const smap = [],
        omap = [];
  let counter = len,
      temp, index;

  while (counter > 0) {
    counter -= 1;
    index = Math.floor(Math.random() * counter);

    if (!smap[counter]) {
      smap[counter] = counter;
    }
    if (!smap[index]) {
      smap[index] = index;
    }
    temp = smap[counter];
    smap[counter] = smap[index];
    smap[index] = temp;
  }
  for (let ii = 0; ii < smap.length; ii += 1) {
    omap[smap[ii]] = smap[(ii + 1) % smap.length] - smap[ii];
  }

  return omap;
}

export class ShuffableArray {
  constructor(arr) {
    this.list = arr;
    this.shuffler = null;
    this.shuffleCount = null;
    this.currentIndex = 0;
  }

  next() {
    this.advanceIndex(1);
    this.shuffler = null;
    return this.current;
  }

  prev() {
    this.shuffler = null;
    this.advanceIndex(-1);
    return this.current;
  }

  shuffleNext() {
    if (!this.shuffler || this.shuffleCount >= this.list.length) {
      this.shuffler = shuffledOffsets(this.list.length);
    } else {
      this.shuffleCount = this.shuffleCount + 1;
    }
    this.advanceIndex(this.shuffler[this.currentIndex]);
    return this.current;
  }

  get current() {
    return this.list[this.currentIndex];
  }

  advanceIndex(dir) {
    const total = this.list.length;
    this.currentIndex = (total + this.currentIndex + dir) % total;
  }
}