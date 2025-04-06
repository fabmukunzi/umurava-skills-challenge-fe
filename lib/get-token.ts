export const getToken = async () => {
    const res = await fetch('/api/auth/session');
    const session = await res.json();
  
    return session?.user?.token;
  };
  