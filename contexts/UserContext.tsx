'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { calcAll } from '@/lib/numerology';
import { actionSaveProfile } from '@/lib/actions/profile';
import type { UserProfile, NumerologyNumbers } from '@/types/numerology';

interface UserContextValue {
  user: User | null;
  profile: UserProfile | null;
  numbers: NumerologyNumbers | null;
  setProfile: (p: UserProfile) => Promise<void>;
  clearProfile: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('name, day, month, year')
      .eq('id', userId)
      .single();
    setProfileState(data?.name ? (data as UserProfile) : null);
  };

  // Load session + profile khi mount
  useEffect(() => {
    const init = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) await loadProfile(currentUser.id);
    };

    init();

    // Lắng nghe thay đổi auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) await loadProfile(currentUser.id);
      else setProfileState(null);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfile = useCallback(async (p: UserProfile) => {
    setProfileState(p);
    await actionSaveProfile(p);
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfileState(null);
  }, [supabase]);

  const numbers: NumerologyNumbers | null = profile
    ? calcAll(profile.name, profile.day, profile.month, profile.year)
    : null;

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        numbers,
        setProfile,
        clearProfile,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
