import React, { useState } from "react";
import { motion } from "framer-motion";

// Card Component with editable fields and motion
const Card = ({ data, onUpdate, index, reference }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardData, setCardData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onUpdate(index, cardData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
      tag: {
        ...prev.tag,
        ...(name === "tagTitle" && { tagTitle: value }),
        ...(name === "tagColor" && { tagColor: value }),
      },
    }));
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
      className="relative w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isEditing ? (
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <textarea
              name="desc"
              value={cardData.desc}
              onChange={handleChange}
              className="bg-zinc-800 rounded p-2 text-sm mb-2 resize-none flex-grow"
              placeholder="Enter description"
            />
            <input
              type="text"
              name="filesize"
              value={cardData.filesize}
              onChange={handleChange}
              className="bg-zinc-800 rounded p-2 text-sm mb-2"
              placeholder="File size (e.g., 1.2 mb)"
            />
            <select
              name="tagColor"
              value={cardData.tag.tagColor}
              onChange={handleChange}
              className="bg-zinc-800 rounded p-2 text-sm mb-2"
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
            <input
              type="text"
              name="tagTitle"
              value={cardData.tag.tagTitle}
              onChange={handleChange}
              className="bg-zinc-800 rounded p-2 text-sm mb-2"
              placeholder="Tag title"
            />
            <div className="flex gap-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 px-3 py-1 rounded text-sm"
              >
                Save
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsEditing(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-600 px-3 py-1 rounded text-sm"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        ) : (
          <>
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 bg-zinc-700 p-2 rounded-full"
            >
              ✎
            </motion.button>
            <p className="text-sm leading-tight mt-5 font-semibold">
              {cardData.desc}
            </p>
            <div className="footer absolute bottom-0 w-full left-0 px-8 py-3">
              <div className="flex items-center justify-between mb-3">
                <h5>{cardData.filesize}</h5>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center"
                >
                  {data.close ? "✕" : "↓"}
                </motion.span>
              </div>
              {cardData.tag.isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`tag w-full py-4 ${
                    cardData.tag.tagColor === "blue"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  } flex items-center justify-center rounded-full`}
                >
                  <h3 className="text-sm font-semibold">
                    {cardData.tag.tagTitle}
                  </h3>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
export default Card;
