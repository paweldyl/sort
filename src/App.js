import React, {useState, useEffect} from "react";
import Options from "./Options";
import SortContainer from "./SortContainer";

const App = () => {

  const [items, setItems] = useState([52,51,55,54,50,53,57,56,59,58]);
  const [howMany, setHowMany] = useState(10);
  const [sortType, setSortType] = useState("bubble");
  const [speed, setSpeed] = useState("normal");
  const [color, setColor] = useState("yellow");
  const [target, setTarget] = useState([]);
  const [shouldBreak, setShouldBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const prepareItems = (how_many) => {
    if(how_many > 50)
      how_many = 50;
    else if(how_many < 3)
      how_many = 3;
    let rand;
    let newArray = [];
    let valuesToUse = [];
    for(let i = 0; i < how_many; i++){
      valuesToUse.push(i);
    }
    for(let i = how_many; i > 0; i--){
      // +50 to get heights from 50% of container up to 50 + how_many (which shouldnt be higher then 50)
      rand = Math.floor(Math.random() * i);
      newArray.push(valuesToUse[rand]+50);
      valuesToUse.splice(rand, 1);
    }
    setItems(newArray);
  }
  const startSorting = (e) => {
    e.preventDefault();
    switch(sortType){
      case "bubble":
        bubble();
        break;
      case "quick":
        quick();
        break;
      case "merge":
        mergeSort();
        break;
    }
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const speedValue = () => {
    switch(speed){
      case "slow":
        return 1000;
        break;
      case "normal":
        return 500;
        break;
      case "fast":
        return 200;
        break;
    }
    return 100;
  }
  const bubble = async () =>{
    if(isRunning && shouldBreak !== true){
      setShouldBreak(true);
      await sleep(30000);
    }
    else if(shouldBreak === true)
      return 0;
    setIsRunning(true);
    setShouldBreak(false);
    let itemsArray = [...items];
    let buffer;
    const howFast = speedValue();
    for(let i = items.length - 1; i > 0; i--){
      for(let j = 0; j < i; j++){
        setColor("yellow");
        setTarget([j, j+1]);
        await sleep(howFast);
        if(shouldBreak)
          break;
        if(itemsArray[j] > itemsArray[j+1]){
          setColor("green");
          buffer = itemsArray[j];
          itemsArray[j] = itemsArray[j+1]
          itemsArray[j+1] = buffer;
          setItems([...itemsArray]);
        }
        else
          setColor("red");
        await sleep(howFast);
        if(shouldBreak)
          break;
        console.log(shouldBreak);
      }
      if(shouldBreak)
        break;
    }
    setTarget([]);
    setIsRunning(false);
  }
  const quick = () =>{

  }
  function mergeSort(array) {
    const half = array.length / 2
    if(array.length < 2){
      return array 
    }
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
  }
  const merge = (left, right) => {
    let arr = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    return [ ...arr, ...left, ...right ]
  }

  return(
    <div className = "app-container">
      <Options 
        prepareItems = {prepareItems}
        startSorting = {startSorting}
        setHowMany = {setHowMany}
        setSortType = {setSortType}
        setSpeed = {setSpeed}
        howMany = {howMany}
        sortType = {sortType}
        speed = {speed}
      />
      <SortContainer 
        items = {items}
        target = {target}
        color = {color}
      />
    </div>
  )
}

export default App;