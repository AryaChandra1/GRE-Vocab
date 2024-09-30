import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import WordOfTheDay from '../components/WordOfTheDay';
import Quiz from '../components/Quiz';
import Dashboard from '../components/Dashboard';
import ShortcutUrls from '../components/ShortcutUrls';

export default function Home() {
  const { data: session } = useSession();
  const [word, setWord] = useState(null);

  useEffect(() => {
    // Fetch word of the day
    fetch('/api/word-of-the-day')
      .then(res => res.json())
      .then(data => setWord(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {session ? (
                  <>
                    <p>Welcome, {session.user.name}!</p>
                    <button onClick={() => signOut()}>Sign out</button>
                  </>
                ) : (
                  <button onClick={() => signIn()}>Sign in</button>
                )}
                {word && <WordOfTheDay word={word} />}
                <Quiz word={word} />
                {session && <Dashboard />}
                <ShortcutUrls />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}