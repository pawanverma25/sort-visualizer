var nIntput = document.getElementById("n");
var container = document.getElementById("container");
var startBtn = document.getElementById("start");
var speedInput = document.getElementById("speed");
var newBtn = document.getElementById("new-array");

var n = 0;
speed = 1000;
var array = [];
drawBars();

nIntput.addEventListener('input', drawBars);

speedInput.addEventListener('input', ()=>{
    speed = 301 - speedInput.value;
});

function drawBars(){
    var cur = nIntput.value;
    var diff = n - cur;
    if(diff < 0){
        for(; diff < 0; diff++){
            const el = document.createElement("div");
            var height = 20 + Math.floor(500*Math.random())
            el.setAttribute("style",`height: ${height}px; transition: height ${speed*0.0001}s linear 0s;`);
            el.setAttribute("id", "div"+array.length);
            array.push(height);
            container.appendChild(el);
        }
    } else if(diff > 0) {
        for(; diff > 0; diff--){
            array.pop();
            container.removeChild(container.lastChild);
        }
    }
    n = cur;
}

function disableBtns(){
    startBtn.disabled = true;
    newBtn.disabled = true;
    nIntput.disabled = true;
}

function enableBtns(){
    startBtn.disabled = false;
    newBtn.disabled = false;
    nIntput.disabled = false;
}

async function swap(i, j){
    if(i == j) return;
    document.getElementById(`div${i}`).style.height = array[j]+"px";
    document.getElementById(`div${j}`).style.height = array[i]+"px";
    array[i] += array[j];
    array[j] = array[i] - array[j];
    array[i] = array[i] - array[j];
}

function init(){
    enableBtns();
    container.innerHTML = "";
    n = 0;
    array = [];
    drawBars();
}

newBtn.addEventListener("click",init);

document.getElementById("bubble").addEventListener("click", async function (){
    disableBtns();
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length-i-1; j++){
            document.getElementById(`div${j}`).style.backgroundColor = "#0275d8";
            document.getElementById(`div${j+1}`).style.backgroundColor = "#0275d8";
            if(array[j] > array[j+1]) {
                swap(j, j+1);
            }
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
            document.getElementById(`div${j}`).style.backgroundColor = "aliceblue";
            document.getElementById(`div${j+1}`).style.backgroundColor = "aliceblue";
        }
        document.getElementById(`div${array.length-i-1}`).style.backgroundColor = "#5cb85c";
    }
    newBtn.disabled = false;
});

document.getElementById("selection").addEventListener("click", async function (){
    disableBtns();
    for(var i = 0; i < array.length; i++){
        var curMax = 0;
        document.getElementById("div0").style.backgroundColor = "#0275d8";
        for(var j = 0; j < array.length-i; j++){
            document.getElementById(`div${j}`).style.backgroundColor = "#0275d8";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
            if(array[j] >= array[curMax]){
                document.getElementById(`div${curMax}`).style.backgroundColor = "aliceblue";
                curMax = j;
            }
            else {
                document.getElementById(`div${j}`).style.backgroundColor = "aliceblue";
            }
        }
        swap(curMax,array.length-i-1);
        document.getElementById(`div${array.length-i-1}`).style.backgroundColor = "#5cb85c";
    }
    newBtn.disabled = false;
});

document.getElementById("insertion").addEventListener("click", async () => {
    disableBtns();
    for(var i = 0; i < array.length; i++){
        var j = i;
        document.getElementById(`div${i}`).style.backgroundColor = "#0275d8";
        while(j > 0 && array[j] < array[j-1]){
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
            document.getElementById(`div${j}`).style.backgroundColor = "#5cb85c";
            document.getElementById(`div${j-1}`).style.backgroundColor = "#0275d8";
            swap(j, j-1);
            j--;
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
                document.getElementById(`div${j}`).style.backgroundColor = "#5cb85c";
            }, speed)
        );
    }
    newBtn.disabled = false;
});

async function partition(left, right){
    var pivot = array[right], i = left;
    document.getElementById(`div${right}`).style.backgroundColor = "#d9534f";
    for(var j = left; j < right; j++){
        document.getElementById(`div${j}`).style.backgroundColor = "#0275d8";
        document.getElementById(`div${i}`).style.backgroundColor = "#0275d8";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        if(array[j] <= pivot){
            swap(i, j);
            document.getElementById(`div${i}`).style.backgroundColor = "aliceblue";
            i++;
        }
        document.getElementById(`div${j}`).style.backgroundColor = "aliceblue";
    }
    swap(i, right);
    document.getElementById(`div${left}`).style.backgroundColor = "#5cb85c";
    document.getElementById(`div${right}`).style.backgroundColor = "#5cb85c";
    document.getElementById(`div${i}`).style.backgroundColor = "#5cb85c";
    return i;
}

async function quickSort(left, right){
    if(left < right){
        var pi = await partition(left, right);
        await quickSort(left, pi-1);
        await quickSort(pi+1, right); 
    }

}

document.getElementById("quick").addEventListener("click", async () => {
    disableBtns();
    await quickSort(0, array.length-1);
    newBtn.disabled = false;
});

async function mergeSort(left, right){
    if(left >= right) return;
    let mid = Math.floor((left+right)/2);
    console.log(mid);
    await mergeSort(left, mid);
    await mergeSort(mid+1, right);

    var L = array.slice(left, mid+1);
    var R = array.slice(mid+1, right+1);
    var i = 0, j = 0, k = left;
    var final = left == 0 && right == array.length-1;

    while (i < L.length && j < R.length) {
        document.getElementById(`div${k}`).style.backgroundColor = "#0275d8";
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        }
        else {
            array[k] = R[j];
            j++;
        }
        document.getElementById(`div${k}`).style.height = array[k]+"px";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
                if(final == true){
                    document.getElementById(`div${k}`).style.backgroundColor = "#5cb85c";
                }
                else {
                    document.getElementById(`div${k}`).style.backgroundColor = "aliceblue";
                }
            }, speed)
        );
        k++;
    }
    while (i < L.length) {
        document.getElementById(`div${k}`).style.backgroundColor = "#0275d8";
        array[k] = L[i];
        document.getElementById(`div${k}`).style.height = array[k]+"px";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
                if(final == true){
                    document.getElementById(`div${k}`).style.backgroundColor = "#5cb85c";
                }
                else {
                    document.getElementById(`div${k}`).style.backgroundColor = "aliceblue";
                }
            }, speed)
        );
        i++;
        k++;
    }
    while (j < R.length) {
        document.getElementById(`div${k}`).style.backgroundColor = "#0275d8";
        array[k] = R[j];
        document.getElementById(`div${k}`).style.height = array[k]+"px";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
                if(final == true){
                    document.getElementById(`div${k}`).style.backgroundColor = "#5cb85c";
                }
                else {
                    document.getElementById(`div${k}`).style.backgroundColor = "aliceblue";
                }
            }, speed)
        );
        j++;
        k++;
    }
}

document.getElementById("merge").addEventListener("click", async () => {
    disableBtns();
    await mergeSort(0, array.length-1);
    newBtn.disabled = false;
});
