interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode; 
  }
  
  export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              ✕
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  }
  