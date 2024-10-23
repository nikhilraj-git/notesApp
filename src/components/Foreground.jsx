import React, { useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const Foreground = () => {
  const [cards, setCards] = useState([
    {
      desc: "Drag this card around and click edit to modify",
      filesize: ".9 mb",
      close: false,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "green",
      },
    },
    {
      desc: "Each card can be dragged and edited",
      filesize: "1 mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Upload Now",
        tagColor: "blue",
      },
    },
  ]);

  const constraintsRef = React.useRef(null);

  const handleCardUpdate = (index, updatedCard) => {
    const newCards = [...cards];
    newCards[index] = updatedCard;
    setCards(newCards);
  };

  const addNewCard = () => {
    setCards([
      ...cards,
      {
        desc: "New card description",
        filesize: "0 mb",
        close: false,
        tag: {
          isOpen: true,
          tagTitle: "New Tag",
          tagColor: "green",
        },
      },
    ]);
  };

  return (
    <div
      ref={constraintsRef}
      className="fixed z-[3] top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5"
    >
      {cards.map((item, index) => (
        <Card
          key={index}
          data={item}
          index={index}
          onUpdate={handleCardUpdate}
          reference={constraintsRef}
        />
      ))}
      <motion.button
        onClick={addNewCard}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-60 h-72 rounded-[45px] bg-zinc-900/50 text-white flex items-center justify-center text-3xl hover:bg-zinc-900/70 transition-colors"
      >
        +
      </motion.button>
    </div>
  );
};
export default Foreground;
