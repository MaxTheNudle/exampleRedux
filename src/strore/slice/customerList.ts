import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from '../createAppSlice'

export interface  CustomerDetail {
  title: string;
  fontName: string;
  LastName: string;
  DateOfBirth: string;
  nationality: string;
  IdNumber: string;
  gender: 'Male' | 'Female' | 'Not specified';
  PhoneNumber: string; 
  passport: string;
   salaryExpectations: number;

}

export interface  CustomerList {
  customer: Array<CustomerDetail>;
}



const initialState: CustomerList = {
  customer : [
    {
      title: 'Mr',
      fontName: 'John',
      LastName: 'Doe',
      DateOfBirth: '1990-01-01',
      nationality: 'USA',
      IdNumber: '1234567890',
      gender: 'Male' ,
      PhoneNumber: '+66808108133',
      passport:'' ,
      salaryExpectations: 999999 
    }
  ]
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const customerListSlice = createAppSlice({
  name: "customerList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    addCustomer: create.reducer((state, action:PayloadAction<CustomerDetail> )=> {
        state.customer.push(action.payload)
      }),
    removeCustomer: create.reducer((state, action:PayloadAction<CustomerDetail>)=> {
        // remove wher IdNumber is equal to action.payload
        state.customer = state.customer.filter((item) => item.IdNumber !== action.payload.IdNumber)
      }),
    editCustomer: create.reducer((state, action:PayloadAction<CustomerDetail>)=> {
        // replace wher IdNumber is equal to action.payload
        state.customer = state.customer.map((item) => item.IdNumber === action.payload.IdNumber ? action.payload : item)
      }),
  }),

  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectcustomerList: customerList => customerList.customer,
  },
})

export const { addCustomer , removeCustomer , editCustomer} = customerListSlice.actions

export const { selectcustomerList } = customerListSlice.selectors



