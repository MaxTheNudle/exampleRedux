import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from '../createAppSlice'
import { v4 as uuidv4 } from 'uuid';

export interface  CustomerDetail {
  key: string;
  title: string;
  fontName: string;
  LastName: string;
  DateOfBirth: string;
  nationality: string;
  IdNumber: string;
  gender: string;
  PhoneNumber: string;
  PhoneNumberCountry: string;
  passport: string;
  salaryExpectations: string;

}

export interface  CustomerList {
  customer: Array<CustomerDetail>;
}


const initialState =  {
  customer : [
    {
      key: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      title: 'Mr',
      fontName: 'Watjakon',
      LastName: 'Jantra',
      DateOfBirth: '1999-04-19',
      nationality: 'thai',
      IdNumber: '1-2095-01114-31-3',
      gender: 'male' ,
      PhoneNumber: '808108133',
      PhoneNumberCountry: '+66',
      passport:'' ,
      salaryExpectations: '25-30K'
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
        const uuid = uuidv4()
        const customerToAdd = {...action.payload, key: uuid}
        state.customer.push(customerToAdd )
        // save to LocalStorage
        localStorage.setItem('customerList', JSON.stringify(state))
      }),
      removeCustomer: create.reducer((state, action: PayloadAction<CustomerDetail[]>) => {
        // Remove customers where key matches any of the keys in action.payload
        const keysToRemove = action.payload.map((item) => item.key); // Get all keys from the payload
        state.customer = state.customer.filter((item) => !keysToRemove.includes(item.key)); // Remove items with matching keys
      
        // Update localStorage with the new state
        localStorage.setItem('customerList', JSON.stringify(state));
      }),

    editCustomer: create.reducer((state, action:PayloadAction<CustomerDetail>)=> {
        // replace where key is equal to action.payload
        state.customer = state.customer.map((item) => { 
          if(item.key === action.payload.key) {
            return action.payload
          }
         return  item
        })
        localStorage.setItem('customerList', JSON.stringify(state))
      }),
    fetchCustormerInStorage: create.reducer((state)=> {
        const customerList = localStorage.getItem('customerList')
        if(customerList) {
          console.log('customerList fetchCustormerInStorage', customerList)
          state.customer = JSON.parse(customerList).customer
          console.log(JSON.parse(customerList).customer)
        }
      }),
  }),

  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectcustomerList: customerList => customerList.customer,
  },
})

export const { addCustomer , removeCustomer , editCustomer ,  fetchCustormerInStorage} = customerListSlice.actions

export const { selectcustomerList } = customerListSlice.selectors



