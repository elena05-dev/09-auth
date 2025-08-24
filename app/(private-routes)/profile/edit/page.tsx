'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUser } from '@/lib/api/clientApi';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const router = useRouter();

  const handleSave = async () => {
    const updatedUser = await updateUser({ username });
    setUser(updatedUser);
    router.push('/profile');
  };

  return (
    <main>
      <h1>Edit Profile</h1>
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <p>Email: {user?.email}</p>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => router.push('/profile')}>Cancel</button>
    </main>
  );
}
