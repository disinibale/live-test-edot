// Case : You're looking for an apartment and you received a list of blocks with their own service/facility.

// To get your ideal apartment, you want to find the block with the closest distance from all of the facilities. Please create an algorithm for that solution.

// const blocks = [
//   { gym: false, school: true, store: false },
//   { gym: true, school: false, store: false },
//   { gym: true, school: true, store: false },
//   { gym: false, school: true, store: false },
//   { gym: false, school: true, store: true },
// ];

// For the example above, if [gym, school, store] is the requirement, index 3 is the best location for your apartment.
// Example:
// Reqs: [gym, school, store]
// Block 0: [1, 0, 4] = 4
// Block 1: [0, 1, 3] = 3
// Block 2: [0, 0, 2] = 2
// Block 3: [1, 0, 1] = 1
// Block 4: [2,0,0] = 2
// Block with the most minimum distance to all facilities: Block 3

// Func: Input: Blocks, Reqs
// Output: Block with the most minimum distance to all facilities

// implement the solution with O(n) time complexity.

type TBlocks = Array<number>;

const blocks: Array<TBlocks> = [
  [1, 0, 4],
  [0, 1, 3],
  [0, 0, 2],
  [1, 0, 1],
  [2, 0, 0],
];

function findMinimumLocation(blocks: Array<TBlocks>): string {
  const maxLocation: Array<number> = [];

  for (let i = 0; i < blocks.length; i++) {
    maxLocation.push(findMaxLocation(blocks[i]));
  }

  return `Block ${findMinLocationIndex(maxLocation)}`;
}

function findMaxLocation(arrOfNumber: Array<number>): number {
  let max = Number.MIN_SAFE_INTEGER;
  for (const item of arrOfNumber) {
    if (item > max) {
      max = item;
    }
  }

  return max;
}

function findMinLocationIndex(arrOfNumber: Array<number>): number {
  let min: number = Number.MAX_SAFE_INTEGER;
  let index: number = 0;
  for (let i = 0; i < arrOfNumber.length; i++) {
    if (arrOfNumber[i] < min) {
      min = arrOfNumber[i];
      index = i;
    }
  }

  return index;
}

console.log(findMinimumLocation(blocks));
