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
      case "gnome":
        gnome();
        break;
      case "bogo":
        bogo();
        break;
    }
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const speedValue = () => {
    switch(speed){
      case "slow":
        return 900;
        break;
      case "normal":
        return 350;
        break;
      case "fast":
        return 75;
        break;
    }
    return 100;
  }
  const bubble = async () =>{
    let itemsArray = [...items];
    let buffer;
    const howFast = speedValue();
    for(let i = items.length - 1; i > 0; i--){
      for(let j = 0; j < i; j++){
        setColor("yellow");
        setTarget([j, j+1]);
        await sleep(howFast);
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
      }
    }
    setTarget([]);
  }
  const gnome = async () => {
    let itemsArray = [...items];
    let buffer;
    const howFast = speedValue();
    for(let i = 0; i < itemsArray.length - 1; i++){
      for(let j = 0; j <= i; j++){
        setColor("yellow");
        setTarget([i-j, i+1-j]);
        await sleep(howFast);
        if(itemsArray[i-j] > itemsArray[i+1-j]){
          console.log(i);
          setColor("green");
          buffer = itemsArray[i-j];
          itemsArray[i-j] = itemsArray[i+1-j];
          itemsArray[i+1-j] = buffer;
          setItems([...itemsArray]);
          await sleep(howFast);
        }
        else{
          setColor("red");
          await sleep(howFast);
          break;
        }
      }
    }
    setTarget([]);
  }
  const bogo = async () => {
    const how_many = howMany;
    const howFast = speedValue();
    let rand;
    let newArray;
    let valuesToUse;
    let sorted;
    do {
      newArray = [];
      valuesToUse = [];
      for(let i = 0; i < how_many; i++){
        valuesToUse.push(i);
      }
      for(let i = how_many; i > 0; i--){
        // +50 to get heights from 50% of container up to 50 + how_many (which shouldnt be higher then 50)
        rand = Math.floor(Math.random() * i);
        newArray.push(valuesToUse[rand]+50);
        valuesToUse.splice(rand, 1);
      }
      setItems([...newArray]);
      sorted = true;
      for(let i = 0; i < how_many - 1; i++){
        if(newArray[i] > newArray[i+1])
          sorted = false;
      }
      await sleep(howFast);
    }while(!sorted);
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