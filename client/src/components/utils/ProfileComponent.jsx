import { useState } from "react";
import icon1 from "../../assets/images/avatarIcons/icon7.png";
import icon2 from "../../assets/images/avatarIcons/icon8.png";
import icon3 from "../../assets/images/avatarIcons/icon9.png";
import icon4 from "../../assets/images/avatarIcons/icon10.png";
import icon5 from "../../assets/images/avatarIcons/icon11.png";

const ProfileComponent = () => {
  const [selectedImage, setSelectedImage] = useState(icon1);
  const [images] = useState([icon1, icon2, icon3, icon4, icon5]);
  const [editMode, setEditMode] = useState(false);

  const handleArrowClick = (direction) => {
    const currentIndex = images.indexOf(selectedImage);
    if (direction === "left") {
      const newIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[newIndex]);
    } else if (direction === "right") {
      const newIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[newIndex]);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex flex-col items-center p-4">
      
      <div className="w-48 h-48 mb-4">
        <img
          src={selectedImage}
          alt="Selected Avatar"
          className="w-full h-full object-cover rounded-full shadow-lg"
        />
      </div>

      <button
        onClick={toggleEditMode}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {editMode ? "Close Edit" : "Edit"}
      </button>

      {editMode && (
        <div className="flex items-center">
          <button
            onClick={() => handleArrowClick("left")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            left
          </button>
          <div className="flex space-x-4 mx-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Avatar ${index + 1}`}
                onClick={() => handleImageClick(image)}
                className={`w-20 h-20 rounded-full cursor-pointer transition ${
                  selectedImage === image
                    ? "border-4 border-blue-500 shadow-md"
                    : "border-2 border-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => handleArrowClick("right")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            right
          </button>
        </div>
      )}

      {editMode && (
        <button
          onClick={() => alert("Changes submitted!")}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Submit Changes
        </button>
      )}
    </div>
  );
};

export default ProfileComponent;
