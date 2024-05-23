import { useState } from "react";
import "./index.css";

function App() {
  const [image, setImage] = useState(null);
  const [bgRemovedImg, setBgRemovedImg] = useState(null);
  const [bgRemovedImgUrl, setBgRemovedImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBgChange = () => {
    if (!image) {
      alert("Please upload an image file.");
      return;
    }

    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    if (!validFormats.includes(image.type)) {
      alert("Please upload a valid image file (JPEG or PNG).");
      return;
    }

    setIsLoading(true);
    const ApiKey = "J2FfZLQWrKgpeziMbFAYotWz";
    const url = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", "auto");

    fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": ApiKey,
      },
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = URL.createObjectURL(blob);
          setBgRemovedImg(reader.result);
          setBgRemovedImgUrl(imageUrl);
          setIsLoading(false);
        };
        reader.readAsDataURL(blob);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <header className="bg-white shadow-lg p-6 rounded-b-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">
          Background Remover Tool
        </h1>
      </header>
      <main className="flex flex-grow justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Remove Background
          </h1>
          <div className="space-y-6">
            <input
              type="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-4 cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              onClick={handleBgChange}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none"
            >
              {isLoading ? "Processing..." : "Remove Background"}
            </button>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 rounded-2xl">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          )}
          {bgRemovedImg && !isLoading && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
                Background Removed Image:
              </h2>
              <img
                src={bgRemovedImg}
                alt="Background Removed"
                className="rounded-lg shadow-lg mb-6 mx-auto"
              />
              <a
                href={bgRemovedImgUrl}
                download="image"
                className="block w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300 text-center"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white shadow-lg p-6 mt-auto rounded-t-2xl text-center">
        <p className="text-xl font-bold text-gray-700">
          &copy; 2024 Background Remover Tool. All rights reserved By Vishwas
          Katiyar.
        </p>
      </footer>
    </div>
  );
}

export default App;
