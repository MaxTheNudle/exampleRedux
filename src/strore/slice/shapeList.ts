import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from '../createAppSlice'

export interface ShapeItem {
  id: number;
  name: string;
  type: string;
  color: string;
}

export interface Shape {
  shape: Array<ShapeItem>;
}


const initialState: Shape = {
  shape: [
    {
      id: 1,
      name: "Square",
      type: "square",
      color: "Red",
    },
    {
      id: 2,
      name: "Circle",
      type: "circle",
      color: "Blue",
    },
    {
      id: 3,
      name: "Ellipse",
      type: "ellipse",
      color: "Green",

    },
    {
      id: 4,
      name: "Trapezoid",
      type: "trapezoid",
      color: "Aquamarine",
    },
    {
      id: 5,
      name: "Rectangle",
      type: "rectangle",
      color: "Yellow",
      
    },
    {
      id: 6,
      name: "Parallelogram",
      type: "parallelogram",
      color: "Pink",
      
    }
  ]
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const shapeListSlice = createAppSlice({
  name: "shapeList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    moveLeft: create.reducer(state => {
      const firstItem = state.shape.shift();
      if(firstItem){
        state.shape.push(firstItem);
      }
    }),
    moveRight: create.reducer(state => {
      const lastItem = state.shape.pop();
      if(lastItem){
        state.shape.unshift(lastItem);
      }
    }),
    random: create.reducer(state => {
      state.shape =  shuffleShape(state.shape);
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectShapeList: shapeList => shapeList.shape,
  },
})

export const { moveLeft , moveRight ,random } = shapeListSlice.actions

export const { selectShapeList } = shapeListSlice.selectors


function shuffleShape(array:any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
