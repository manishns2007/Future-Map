import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
}

export async function signUp(email: string, password: string, name: string) {
  const serverUrl = `${supabaseUrl}/functions/v1/make-server-9d0ac4f2/signup`;
  
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to sign up');
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name || 'User',
    },
    accessToken: data.session.access_token,
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error || !data.session) {
    return null;
  }

  return {
    user: {
      id: data.session.user.id,
      email: data.session.user.email!,
      name: data.session.user.user_metadata?.name || 'User',
    },
    accessToken: data.session.access_token,
  };
}