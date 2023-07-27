const n=40;
const array=[];

let audioCtx=null;

init();

function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

function play(algo){
    const swaps=algo([...array]);
    animate(swaps);
}



function sort(algorithm) {
    // Call the respective sorting function based on the selected algorithm
    switch (algorithm) {
      case 'bubble':
        play(bubbleSort);
        break;
      case 'selection':
        play(selectionSort);
        break;
      case 'insertion':
        play(insertionSort);
        break;
      case 'quick':
        play(quickSort);
        break;
      case 'heap':
        play(heapSort);
        break;
      default:
        console.log('Invalid algorithm');
    }
  }





function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift(0);
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    setTimeout(function(){
        animate(swaps);
    },200);
}




function insertionSort(array) {
    const swaps = [];
  
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
  
      while (j >= 0 && array[j] > key) {
        swaps.push([j, j + 1]);
        array[j + 1] = array[j];
        j--;
      }
  
      array[j + 1] = key;
    }
  
    return swaps;
  }



function bubbleSort(array){
    const swaps=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            if(array[i-1]>array[i]){
                swaps.push([i-1,i]);
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return swaps;
}



function selectionSort(array) {
    const swaps = [];
  
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        swaps.push([i, minIndex]);
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }
  
    return swaps;
  }

  function quickSort(array) {
    if (array.length <= 1) {
      return array;
    }
  
    const pivot = array[array.length - 1];
    const left = [];
    const right = [];
    const equal = [pivot];
  
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else if (array[i] > pivot) {
        right.push(array[i]);
      } else {
        equal.push(array[i]);
      }
    }
  
    return [...quickSort(left), ...equal, ...quickSort(right)];
  }
  
  
  function heapSort(array) {
    buildMaxHeap(array);
    const swaps = [];
  
    for (let i = array.length - 1; i > 0; i--) {
      swaps.push([0, i]);
      [array[0], array[i]] = [array[i], array[0]];
      maxHeapify(array, 0, i);
    }
  
    return swaps;
  }
  
  function buildMaxHeap(array) {
    const n = array.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      maxHeapify(array, i, n);
    }
  }
  
  function maxHeapify(array, i, size) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
  
    if (left < size && array[left] > array[largest]) {
      largest = left;
    }
  
    if (right < size && array[right] > array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      maxHeapify(array, largest, size);
    }
  }
  



function showBars(indices){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red";
        }
        container.appendChild(bar);
    }   
}

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}
