"use client";

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { createUser, updateUser, deleteUser } from '@/app/actions/userActions';

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      await createUser(formData);
    }
    
    // Refresh page or optimistic update
    window.location.reload();
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Users</h1>
        <button 
          onClick={() => { setEditingUser(null); setIsModalOpen(true); }}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-white/5 text-neutral-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  <button 
                    onClick={() => { setEditingUser(user); setIsModalOpen(true); }}
                    className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingUser ? 'Edit User' : 'New User'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingUser?.name}
                  required 
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  defaultValue={editingUser?.email}
                  required 
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Password {editingUser && '(Leave blank to keep current)'}
                </label>
                <input 
                  type="password" 
                  name="password" 
                  required={!editingUser}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-neutral-300 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
