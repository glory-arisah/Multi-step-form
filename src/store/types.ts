import type { RemovableRef } from "@vueuse/core";

export type LSString = RemovableRef<string> | string;
export type LSNumber = RemovableRef<number> | number;
export type LSArray = RemovableRef<string[]> | string[];
export type LSBool = RemovableRef<boolean> | boolean;

export interface ErrorsProps {
  personalDetails: LSBool;
  about: LSBool;
  assist: LSBool;
  budget: LSBool;
}

export interface PersonalDetailsProps {
  fullName: LSString;
  email: LSString;
  phone: LSString;
  placeOfBirth: LSString;
}

export interface UserProfileProps extends PersonalDetailsProps {
  about: LSString;
  assist: LSArray;
  budget: LSNumber;
}

export interface RootState {
  users: UserProfileProps[];
  stepIndex: number;
  hasErrors: ErrorsProps;
  profile: UserProfileProps;
}

export interface ProfilePayloadProps {
  type: keyof UserProfileProps;
  value: never;
}

export interface Steps {
  1: string;
  2: string;
  3: string;
  4: string;
}
