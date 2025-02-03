
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