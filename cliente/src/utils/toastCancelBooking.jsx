import toast from "react-hot-toast"

export const ShowCancelBookingToast = (onCancelBooking, bookingId) => {
  toast(
    (t) => (
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <svg
          className="w-16 h-16 text-yellow-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Estás seguro?</h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          ¿Realmente deseas cancelar esta reservación? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-center space-x-4 w-full">
          <button
            onClick={() => {
              onCancelBooking(bookingId);
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 cursor-pointer bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sí, cancelar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    ),
    {
      duration: Number.POSITIVE_INFINITY,
      position: "top-center",
    }
  );
};

