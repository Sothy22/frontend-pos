import { useEffect } from 'react';

const NotFoundPage = () => {
  // useEffect(() => {
  //   document.title = "About";
  // }, []);

  return (
    <div>
      <h2 className="text-5xl font-bold flex justify-center items-center h-[100vh]">
        404 Not Found
      </h2>
    </div>
  );
};

export default NotFoundPage;
