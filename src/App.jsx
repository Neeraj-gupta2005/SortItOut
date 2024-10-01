import { useRef, useState } from "react";

function App() {
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
  ];

  const listRefs = useRef([]);
  const [array, setArray] = useState(numbers);
  const [isSorting, setIsSorting] = useState(false); 
  const [currentIndices, setCurrentIndices] = useState([-1,-1]);
  const [selectedSort, setSelectedSort] = useState("BubbleSort");

  // Sleep function to introduce delay
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Function to shuffle the array
  const shuffleArray = (arr) => {
    let shuffledArray = [...arr]; // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      // Swap elements
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    setArray(shuffledArray); // Update state to trigger re-render
  };

  // Function to highlight the sorted array
  const sortingComplete = async () => {
    for (let i = 0; i < numbers.length; i++) {
      // Change the background color of the current item
      if (listRefs.current[i]) {
        listRefs.current[i].style.backgroundColor = "white";
      }
      await sleep(10); // Wait for 100ms before changing the next
    }
    setTimeout(() => {
      for (let i = 0; i < numbers.length; i++) {
        // Change the background color of the current item
        if (listRefs.current[i]) {
          listRefs.current[i].style.backgroundColor = "#07fc03";
        }
      }
    }, 1000);
  }
  
  // Bubble Sort implementation with delay
  const bubbleSort = async (arr) => {
    const n = arr.length;
    let sortedArray = [...arr]; // Create a copy of the array
    setIsSorting(true); // Start sorting

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap elements
          setCurrentIndices([j,j+1]);
          const temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
          
          // Update state using functional update to ensure it uses the latest state
          setArray([...sortedArray]); // Update state to trigger re-render
          
          await sleep(5); // Introduce a delay
        }
      }
    }
    setCurrentIndices([-1,-1]);
    sortingComplete();
    setIsSorting(false); // End sorting


  }

  // Selection Sort implementation with delay
  const selectionSort = async (arr) => {
    const n = arr.length;
    let sortedArray = [...arr];
    setIsSorting(true); // Start sorting

    for(let i = 0 ; i < n - 1 ; i++){
      let minIndex = i;

      for(let j = i + 1; j < n; j++) {
        setCurrentIndices([i, j]); // Highlight both current element and compared element
        
        if(sortedArray[j] < sortedArray[minIndex]){
          minIndex = j; // Highlight the new minimum element
        }
        
        await sleep(1); // Adjust this for faster/slower animation
      }

      // Highlight the swap operation (color change for both elements)
      setCurrentIndices([i, minIndex]); // Highlight the elements to be swapped
      await sleep(1); // Delay for visualization
      
      // Swap elements
      const temp = sortedArray[i];
      sortedArray[i] = sortedArray[minIndex];
      sortedArray[minIndex] = temp;

      // Update array state
      setArray([...sortedArray]);

      // Clear highlight after swap
      setCurrentIndices([-1, -1]);
    }
    setCurrentIndices([-1, -1]); // Reset the highlighting
    sortingComplete(); // Notify sorting completion
    setIsSorting(false); // Mark sorting as done
}

const insertionSort = async (arr) => {
  let sortedArray = [...arr];
  const n = sortedArray.length;
  setIsSorting(true); // Start sorting
  
  for (let i = 1; i < n; i++) {
    let key = sortedArray[i]; // Element to be inserted
    let j = i - 1;

    // Highlight the current element being compared
    setCurrentIndices([i, j]);
    await sleep(15);

    // Shift elements of the sorted part of the array to the right
    while (j >= 0 && sortedArray[j] > key) {
      sortedArray[j + 1] = sortedArray[j]; // Shift element right
      setArray([...sortedArray]); // Update the array state

      // Highlight comparison between elements
      setCurrentIndices([j + 1, j]);
      await sleep(15);
      
      j--;
    }

    // Insert the key at the correct position
    sortedArray[j + 1] = key;
    setArray([...sortedArray]); // Update the array state
    await sleep(15);

    // Reset highlighting
    setCurrentIndices([-1, -1]);
  }

  sortingComplete(); // Trigger post-sort animation
  setIsSorting(false); // End sorting
};


const mergeSort = async (arr, start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const middle = Math.floor((start + end) / 2);

  // Split left half
  await mergeSort(arr, start, middle);
  // Split right half
  await mergeSort(arr, middle + 1, end);
  // Merge the two halves
  await merge(arr, start, middle, end);

  if(start === 0 && end === arr.length - 1) {
    sortingComplete();
    setIsSorting(false);
  }

};

const merge = async (arr, start, middle, end) => {
  let left = arr.slice(start, middle + 1);
  let right = arr.slice(middle + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    setCurrentIndices([k]); // Highlight the index being merged
    await sleep(15);

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    
    setArray([...arr]); // Update array state
    k++;
  }

  // Copy any remaining elements from the left half
  while (i < left.length) {
    setCurrentIndices([k]);
    await sleep(15);
    arr[k] = left[i];
    i++;
    setArray([...arr]);
    k++;
  }

  // Copy any remaining elements from the right half
  while (j < right.length) {
    setCurrentIndices([k]);
    await sleep(15);
    arr[k] = right[j];
    j++;
    setArray([...arr]);
    k++;
  }

  setCurrentIndices([-1]); // Reset highlighting after merging
  
};




const quickSort = async (arr, start = 0, end = arr.length - 1) => {
  if (start < end) {
    // Partition the array and get the pivot index
    const pivotIndex = await partition(arr, start, end);
    
    // Recursively sort the left partition
    await quickSort(arr, start, pivotIndex - 1);
    
    // Recursively sort the right partition
    await quickSort(arr, pivotIndex + 1, end);
  }

  // If sorting is complete, call sortingComplete
  if (start === 0 && end === arr.length - 1) {
    sortingComplete();
    setIsSorting(false); // Mark sorting as complete
  }
};

const partition = async (arr, start, end) => {
  let pivot = arr[end];  // Take the last element as the pivot
  let pivotIndex = start; // Set the pivot index to start initially

  for (let i = start; i < end; i++) {
    setCurrentIndices([i, pivotIndex]); // Highlight the current element and pivot
    await sleep(20); // Slow down for visualization

    if (arr[i] < pivot) {
      // Swap elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      setArray([...arr]); // Update array state
      pivotIndex++; // Move the pivot index
    }
  }

  // Swap the pivot element with the element at pivotIndex
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  setArray([...arr]); // Update array state
  await sleep(15); // Slow down for visualization

  setCurrentIndices([-1, -1]); // Reset highlight
  return pivotIndex; // Return the final pivot position
};



  return (
    <>
      <h1 className="text-center text-white font-bold text-2xl uppercase font-sans mt-3">Observing array</h1>

      <div className="p-3 mt-6 m-5 h-[80vh]">
        <div className="bg-black w-full h-full">
          <ul className="w-full h-full flex items-end gap-0.5 bg-black">
            {array.map((item, i) => (
              <li
                key={i}
                ref={(el) => (listRefs.current[i] = el)}
                className={`bg-[#07fc03] ${currentIndices.includes(i) ? 'bg-white' : ''}`}
                style={{
                  height: `${item}%`,
                  width: `${100 / numbers.length}%`, // Calculate width based on total items
                }}
              />
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-3 items-start max-sm:flex-col max-sm:gap-3 max-sm:items-end">
          <button
            className="px-4 py-2 rounded-lg bg-white hover:bg-slate-300 transition-all duration-75"
            onClick={() => shuffleArray(array)}
            disabled={isSorting} // Disable while sorting
          >
            Randomise
          </button>
          <div className="flex items-start gap-3">
            <select value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
            >
              <option value="BubbleSort">Bubble Sort</option>
              <option value="SelectionSort">Selection Sort</option>
              <option value="InsertionSort">Insertion Sort</option>
              <option value="MergeSort">Merge Sort</option>
              <option value="QuickSort">Quick Sort</option>
            </select>
            <button
              className="hover:bg-slate-300 transition-all duration-75  rounded-lg bg-white px-4 py-2"
              onClick={() => {
                if (selectedSort === "BubbleSort") {
                  bubbleSort(array);
                }
                else if (selectedSort === "SelectionSort") {
                  selectionSort(array);
                }
                else if (selectedSort === "MergeSort") {
                  mergeSort(array);
                }
                else if (selectedSort === "QuickSort") {
                  quickSort(array);
                }
                else if (selectedSort === "InsertionSort") {
                  insertionSort(array);
                }
              }}
              disabled={isSorting} // Disable while sorting
            >
              Sort
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
