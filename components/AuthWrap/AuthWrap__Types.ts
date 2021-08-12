import React from 'react';

export declare interface AuthWrapProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  eventToCheck: any;
  successCallback: (res: any) => void;
  signInText?: React.ReactNode | string;
  headerContent?: React.ReactNode;
  otherFields?: Object;
  options?: {}[];
  theme?: any;
}

export declare interface AuthModalProps {
  otherFields?: {};
  title?: React.ReactNode;
  eventToCheck: any;
  open: boolean;
  successCallback: (res: any) => void;
  signInText?: React.ReactNode | string;
  headerContent?: React.ReactNode;
  theme: any;
}
