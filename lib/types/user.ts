
export interface UserSchema {
  names: string;
  role: string;
  profile_url: string;
  email: string;
  id: string;
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