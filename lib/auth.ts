import { supabase } from "@/lib/supabaseClient";

// Signup
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { user: data.user, error };
  };
  
  // Login
  export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data.user, error };
  };
  
  // Logout
  export const signOut = async () => {
    await supabase.auth.signOut();
  };