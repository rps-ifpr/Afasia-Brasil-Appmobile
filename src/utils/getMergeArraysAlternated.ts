function getMergeArraysAlternated(
  firstArray: any[],
  secondArray: any[],
): any[] {
  let run = 0;
  let first = 0;
  let second = 0;

  const newArr = [];

  while (run < firstArray.length + secondArray.length) {
    if (first > second) {
      newArr[run] = secondArray[second];
      second++;
    } else {
      newArr[run] = firstArray[first];
      first++;
    }
    run++;
  }

  return newArr;
}

export { getMergeArraysAlternated };
