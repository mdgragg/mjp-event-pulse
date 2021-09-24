import React from 'react';

type AuthOptions = 'emailOnly' | 'canRegister' | 'registerOnly'

export declare interface AuthModalInputOptions {
    displayName: string
    // initial value
    value: string,
    required: boolean,
  
}

export declare interface AuthWrapProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  eventToCheck: any;
  successCallback: (res: any) => void;
  signInText?: React.ReactNode | string;
  headerContent?: React.ReactNode;
  otherFields?: {
    [x: string] : AuthModalInputOptions
  }
  options?: AuthOptions[];
  theme?: any;
}

export declare interface AuthModalProps {
  otherFields?: {
    [x: string] : AuthModalInputOptions
  }
  title?: React.ReactNode;
  eventToCheck: any;
  open: boolean;
  successCallback: (res: any) => void;
  signInText?: React.ReactNode | string;
  headerContent?: React.ReactNode;
  theme: any;
}
