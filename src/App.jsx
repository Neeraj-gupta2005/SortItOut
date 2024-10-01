import { useState } from "react";

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

  const [array, setArray] = useState(numbers);
  const [isSorting, setIsSorting] = useState(false); 
  const [currentIndices, setCurrentIndices] = useState([-1,-1]);

  // Sleep function to introduce delay
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const sortingComplete = () => {
    array.forEach(element => {
      
    });
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
    setIsSorting(false); // End sorting

    sortingComplete();
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

  return (
    <>
      <h1 className="text-center text-white font-bold text-2xl uppercase font-sans mt-3">Observing array</h1>

      <div className="p-3 mt-6 m-5 h-[80vh]">
        <div className="bg-black w-full h-full">
          <ul className="w-full h-full flex items-end gap-0.5 bg-black">
            {array.map((item, i) => (
              <li
                key={i}
                className={`bg-[#07fc03] ${currentIndices.includes(i) ? 'bg-white' : ''}`}
                style={{
                  height: `${item}%`,
                  width: `${100 / numbers.length}%`, // Calculate width based on total items
                }}
              />
            ))}
          </ul>
        </div>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 mt-3 rounded-lg bg-white hover:bg-slate-300 transition-all duration-75"
            onClick={() => shuffleArray(array)}
            disabled={isSorting} // Disable while sorting
          >
            Randomise
          </button>
          <button
            className="hover:bg-slate-300 transition-all duration-75 px-4 py-2 mt-3 rounded-lg bg-white"
            onClick={() => bubbleSort(array)}
            disabled={isSorting} // Disable while sorting
          >
            Sort
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
