const ErrorComponent: React.FC = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  };
  
export default ErrorComponent;