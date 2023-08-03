export interface ErrorsProps {
  personalDetails: boolean;
  about: boolean;
  assist: boolean;
  budget: boolean;
}

export interface PersonalDetailsProps {
  fullName: string;
  email: string;
  phone: string;
  placeOfBirth: string;
}

export interface UserProfileProps extends PersonalDetailsProps {
  about: string;
  assist: string[];
  budget: number;
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
