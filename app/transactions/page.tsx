"use client";
import ComponentWrapper from "../components/ComponentWrapper";
import CustomList from "../components/CustomList";
import VideoComponent from "../components/VideoComponent";
import Buttons from "./components/Buttons";
import Modal from "../components/Modal";
import { useState } from "react";

export default function Transactions() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-[32px] text-[#252525] font-semibold leading-9">
            Agnikul Cosmos
          </div>
        </div>
        <div className="text-base font-normal leading-6 text-black">
          One of India’s most promising growth stage Space-tech companies. One
          of India’s most promising growth stage Space-tech companies. One of
          India’s most promising growth stage Space-tech companies. One of
          India’s most promising growth stage Space-tech companies. One of
          India’s most promising growth stage Space-tech companies. One of
          India’s most promising growth stage Space-tech companies.
        </div>
      </div>
      <div className="sticky top-24 z-10">
        <Buttons setShowModal={setShowModal} />
      </div>
      <ComponentWrapper>
        <CustomList />
      </ComponentWrapper>
      <VideoComponent />
      <ComponentWrapper
        heading="DISCLAIMER"
        subHeading="Informational only, not financial advice, no liability assumed. May contain forward-looking statements—no assurances. Based on company material and other 3rd parties data, please do your own research. Informational only, not financial advice, no liability assumed. May contain forward-looking statements—no assurances. Based on company material and other 3rd parties data, please do your own research. Informational only, not financial advice, no liability assumed. May contain forward-looking statements—no assurances. Based on company material and other 3rd parties data, please do your own research. Informational only, not financial advice, no liability assumed. May contain forward-looking statements—no assurances. Based on company material and other 3rd parties data, please do your own research."
      />
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        title="Successful!"
        description="Thank you for showing your interest in us. We have received your request successfully, and our team will carefully review it and get in touch with you shortly to assist you further."
        buttonText="Go back to dashboard"
      />
    </div>
  );
}
