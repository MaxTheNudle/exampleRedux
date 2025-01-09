// /d:/test/NextJS/example/src/app/provider.tsx
"use client";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../strore/store';
import type { ReactNode } from "react";

interface Props {
    readonly children: ReactNode;
  }
export const StoreProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
  };