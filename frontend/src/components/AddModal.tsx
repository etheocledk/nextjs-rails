// import Modal from '@/components/Modal';

// interface User {
//     name: string;
//     email: string;
// }

// interface ModalProps {
//     isOpen: boolean;
//     isOpenAddModal: boolean;
//     onClose: () => void;
//     modalData: User | null;
// }

// export default function AddEditModal({ isOpen, onClose, isOpenAddModal, modalData }: ModalProps) {
//     if (!isOpenAddModal) return null;

//     const createUserMutation = useMutation({
//         mutationFn: apiRouter.users.createUser,
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ['getUsers'] });
//           setMessage('Utilisateur ajouté avec succès');
//         },
//       });
    
//       const updateUserMutation = useMutation({
//         mutationFn: apiRouter.users.updateUser,
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ['getUsers'] });
//           setMessage('Utilisateur modifié avec succès');
//         },
//       });
    

//     const handleSave = async (data: User) => {
//         const requestData = {
//           user: {
//             name: data.name,
//             email: data.email,
//           },
//         };
    
//         if (modalData) {
//           updateUserMutation.mutate({ id: modalData.id, ...requestData.user });
//         } else {
//           createUserMutation.mutate(requestData.user);
//         }
    
//         setIsAddEditModalOpen(false);
//         setTimeout(() => setMessage(null), 3000);
//       };

//     {/* Ajouter ou editer un utilisateur */ }
//     <Modal
//         isOpen={isAddEditModalOpen}
//         onClose={() => setIsAddEditModalOpen(false)}
//         title={modalData ? 'Modifier utilisateur' : 'Ajouter utilisateur'}
//     >
//         <form
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target as HTMLFormElement);
//                 const data = Object.fromEntries(formData.entries()) as unknown as User;
//                 handleSave(data);
//             }}
//         >
//             <div className="space-y-4">
//                 <input
//                     name="name"
//                     placeholder="Nom d'utilisateur"
//                     defaultValue={modalData?.name || ''}
//                     required
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                     name="email"
//                     placeholder="Email"
//                     defaultValue={modalData?.email || ''}
//                     required
//                     type="email"
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>
//             <div className="mt-6 flex justify-end space-x-4">
//                 <button
//                     type="submit"
//                     className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                     Enregistrer
//                 </button>
//                 <button
//                     type="button"
//                     onClick={() => setIsAddEditModalOpen(false)}
//                     className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                     Annuler
//                 </button>
//             </div>
//         </form>
//     </Modal>
// }