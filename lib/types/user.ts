
export interface UserSchema {
  full_name: string;
  role: string;
  profile_image: string;
  email:string;
}

export interface AppState {
  userReducer: {
    user: UserSchema;
  };
}

export interface SignupRequest {
  names: string;
  email: string;
  password: string;
}