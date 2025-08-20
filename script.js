const arrayContainer = document.getElementById("arrayContainer");
const generateBtn = document.getElementById("generateBtn");
const pauseBtn = document.getElementById("pauseBtn");
const algoSelect = document.getElementById("algoSelect");

let array = [];
let sorting = false;
let paused = false;

function generateArray(size = 20){
    if(sorting){
        //stop current sort before generating new
        sorting = false;
        paused = false;
    }
    array = []; //reset
    arrayContainer.innerHTML = "";
    for(let i = 0; i < size; i++){
        const value = Math.floor(Math.random() * 200) + 20; //20-220px height
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${value}px`;
        bar.style.backgroundColor = `hsl(${value * 3}, 70%, 50%)`;

        const dot = document.createElement("div");
        dot.classList.add("marker-dot");
        dot.style.display = "none"; //hidden until active
        bar.appendChild(dot);

        arrayContainer.appendChild(bar);
    }
}

function setDot(bar, show, color = "red"){
    const dot = bar.querySelector(".marker-dot");
    if(dot){
        dot.style.backgroundColor = color;
        dot.style.display = show ? "block" : "none";
    }
}

async function delay(ms){
    while(paused){
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(){
    sorting = true;
    const bars = document.querySelectorAll(".array-bar");

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - i - 1; j++){
            bars[j].style.border = "2px solid black"; //bar outline
            bars[j + 1].style.border = "2px solid black";

            if(!sorting){
                return; //stop early if cancelled
            }

            setDot(bars[j], true, "red");
            setDot(bars[j + 1], true, "green");

            if(array[j] > array[j + 1]){
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            await delay(100);
            setDot(bars[j], false);
            setDot(bars[j + 1], false);

            bars[j].style.border = "none"; //reset border after compare
            bars[j + 1].style.border = "none";
            bars[j].style.backgroundColor = `hsl(${array[j] * 1.8}, 70%, 50%)`;//keep original color based on value
            bars[j + 1].style.backgroundColor = `hsl(${array[j + 1] * 1.8}, 70%, 50%)`;
        }
        bars[array.length - i - 1].style.border = "none"; //no border
    }
    sorting = false;
    pauseBtn.textContent = "▶";
}

generateBtn.addEventListener("click", () => {
    sorting = false;
    paused = false;
    pauseBtn.textContent = "▶";
    generateArray();
});

pauseBtn.addEventListener("click", () => {
    if(!sorting){
        const algo = algoSelect.value;
        if(algo === "bubble"){
            bubbleSort();
            pauseBtn.textContent = "⏸";
        }
    } else {
        paused = !paused;
        pauseBtn.textContent = paused ? "▶" : "⏸";
    }
});

//initialize
generateArray();