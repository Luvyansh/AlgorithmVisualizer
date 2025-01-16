export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }




  export function getBubbleSortAnimations(array) {
    const animations = [];
    const n = array.length;
    let isSwapped;
    for (let i = 0; i < n - 1; i++) {
        isSwapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Push indices being compared for highlighting.
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);

            if (array[j] > array[j + 1]) {
                // Push the indices and the new height for swap.
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                // Perform the swap.
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                isSwapped = true;
            } else {
                // Push the indices and their unchanged heights.
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
        if (!isSwapped) break; // Stop if array is already sorted.
    }
    return animations;
}



export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        // Highlight the bars being compared with the pivot.
        animations.push([i, endIdx]);
        animations.push([i, endIdx]);
        if (array[i] < pivotValue) {
            // Swap if current element is less than the pivot.
            animations.push([i, array[pivotIdx]]);
            animations.push([pivotIdx, array[i]]);
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        } else {
            // Push the indices with unchanged values.
            animations.push([i, array[i]]);
            animations.push([pivotIdx, array[pivotIdx]]);
        }
    }
    // Swap the pivot into its correct position.
    animations.push([pivotIdx, endIdx]);
    animations.push([pivotIdx, endIdx]);
    animations.push([pivotIdx, array[endIdx]]);
    animations.push([endIdx, array[pivotIdx]]);
    [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
    return pivotIdx;
}



export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const n = array.length;

    // Build a max heap.
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // Extract elements from the heap one by one.
    for (let i = n - 1; i > 0; i--) {
        // Move the current root to the end.
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([0, array[i]]);
        animations.push([i, array[0]]);
        [array[0], array[i]] = [array[i], array[0]];

        // Call heapify on the reduced heap.
        heapify(array, i, 0, animations);
    }
    return animations;
}

function heapify(array, size, rootIdx, animations) {
    let largest = rootIdx; // Initialize largest as root.
    const left = 2 * rootIdx + 1; // Left child.
    const right = 2 * rootIdx + 2; // Right child.

    // Compare left child with root.
    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    // Compare right child with the largest so far.
    if (right < size && array[right] > array[largest]) {
        largest = right;
    }

    // If the largest is not root, swap and continue heapifying.
    if (largest !== rootIdx) {
        animations.push([rootIdx, largest]);
        animations.push([rootIdx, largest]);
        animations.push([rootIdx, array[largest]]);
        animations.push([largest, array[rootIdx]]);
        [array[rootIdx], array[largest]] = [array[largest], array[rootIdx]];
        heapify(array, size, largest, animations);
    }
}


export function getInsertionSortAnimations(array) {
    const animations = [];
    const length = array.length;
    for (let i = 1; i < length; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            animations.push([j, j - 1]);
            animations.push([j, j - 1]);
            animations.push([j, array[j - 1]]);
            animations.push([j - 1, array[j]]);
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            j--;
        }
    }
    return animations;
}