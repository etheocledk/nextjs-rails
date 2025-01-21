'use client';

import { useState } from 'react';

import Modal from '@/components/Modal';

import apiRouter from '@/api/router';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function UsersPage() {
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalData, setModalData] = useState<User | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  //isLoading, isError, isSuccess
  const { data: users, refetch } = useQuery({
    queryKey: ['getUsers'],
    queryFn: apiRouter.users.getUsers
  })

  const deleteMutation = useMutation({
    mutationFn: apiRouter.users.deleteUser, onSuccess: () => {
      refetch();
      setMessage('Utilisateur supprimé avec succès');
      setTimeout(() => setMessage(null), 3000);
    }
  });

  const handleAdd = () => {
    setModalData(null);
    setIsAddEditModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setModalData(user);
    setIsAddEditModalOpen(true);
  };

  const handleDetails = (user: User) => {
    setModalData(user);
    setIsDetailModalOpen(true);
  };

  const createUserMutation = useMutation({
    mutationFn: apiRouter.users.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      setMessage('Utilisateur ajouté avec succès');
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: apiRouter.users.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      setMessage('Utilisateur modifié avec succès');
    },
  });

  const handleSave = async (data: User) => {
    const requestData = {
      user: {
        name: data.name,
        email: data.email,
      },
    };

    if (modalData) {
      updateUserMutation.mutate({ id: modalData.id, ...requestData.user });
    } else {
      createUserMutation.mutate(requestData.user);
    }

    setIsAddEditModalOpen(false);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-full">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Gestion des utilisateurs</h1>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg text-white ${message.startsWith('Erreur') ? 'bg-red-500' : 'bg-green-500'
              }`}
          >
            {message}
          </div>
        )}

        <div className="flex justify-end mb-6">
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Ajouter
          </button>
        </div>

        <div className="overflow-hidden rounded-lg shadow overflow-x-scroll">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-500">ID</th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">Nom d'utilisateur</th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">Email</th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">Date de création</th>
                <th className="text-center px-6 py-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user: User, idx: number) => (
                  <tr key={user.id} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.created_at}</td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDetails(user)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Détails
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(user)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Aucun utilisateur disponible</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Ajouter ou editer un utilisateur */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        title={modalData ? 'Modifier utilisateur' : 'Ajouter utilisateur'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries()) as unknown as User;
            handleSave(data);
          }}
        >
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Nom d'utilisateur"
              defaultValue={modalData?.name || ''}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              placeholder="Email"
              defaultValue={modalData?.email || ''}
              required
              type="email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setIsAddEditModalOpen(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      </Modal>

      {/* Détails utilisateur */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Détails utilisateur"
      >
        {modalData && (
          <div className="space-y-4 text-gray-700">
            <p><strong>ID:</strong> {modalData.id}</p>
            <p><strong>Nom d'utilisateur:</strong> {modalData.name}</p>
            <p><strong>Email:</strong> {modalData.email}</p>
            <p><strong>Email:</strong> {modalData.created_at}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
