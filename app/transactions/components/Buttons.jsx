"use client";

import ButtonsGroup from "../../components/ButtonsGroup";

export default function Buttons({ setShowModal }) {
  return (
    <ButtonsGroup
      text="Show Deck"
      text1="I'm Interested"
      onClick={() => {
        window.open("https://docsend.com/view/279mvs6cnjzpm67v", "_blank");
      }}
      onClick1={() => {
        setShowModal(true);
      }}
    />
  );
}
