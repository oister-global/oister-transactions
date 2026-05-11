"use client";

import ButtonsGroup from "@/app/components/ButtonsGroup";
import ComponentWrapper from "@/app/components/ComponentWrapper";
import CustomList from "@/app/components/CustomList";
import Modal from "@/app/components/Modal";
import PageLoader from "@/app/components/PageLoader";
import VideoComponent from "@/app/components/VideoComponent";
import backgroundImage from "@/app/lib/backgroundImage";
import { htmlListToArray, trimHTML } from "@/app/lib/htmlConversion";
import {
  useGetTransactionQuery,
  useShowInterestMutation,
} from "@/app/store/services/transactionsApi";
import { ChevronIcon } from "@/public/svg";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { data: { data = {} } = {}, isLoading, isError } = useGetTransactionQuery({
    id,
  });
  const [showInterest, { isLoading: isShowInterestLoading }] =
    useShowInterestMutation();

  if (isError) notFound();

  const {
    heading,
    subHeading,
    disclaimer,
    bulletPoints,
    deckLink,
    videoLink,
    index,
    isInterested,
  } = data || {};

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col sm:gap-8 xxs:gap-6">
      <div className="relative left-1/2 h-60 w-screen max-w-[100vw] shrink-0 -translate-x-1/2 xxs:-mt-3 sm:-mt-8">
        <Image
          src={backgroundImage(index)}
          alt={trimHTML(heading) || "background image"}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col sm:gap-8 xxs:gap-4">
        <div className="flex items-center gap-2 ml-[-6px]">
          <ChevronIcon onClick={() => router.back()} color="#252525" />
          <div className="text-2xl font-semibold leading-8 text-[#252525] sm:text-3xl md:text-[32px] md:leading-9">
            {trimHTML(heading)}
          </div>
        </div>
        <div className="text-base font-normal leading-6 text-black">
          {trimHTML(subHeading)}
        </div>
      </div>
      <div className="sticky xxs:top-22  sm:top-24 z-10">
        <ButtonsGroup
          text="Show Deck"
          text1="I'm Interested"
          onClick={() => {
            window.open(trimHTML(deckLink), "_blank");
          }}
          onClick1={async () => {
            const response = await showInterest({ id });
            if (response?.data) {
              setShowModal(true);
            }
          }}
          hideButton1={isInterested}
          isLoading1={isShowInterestLoading}
        />
      </div>
      <ComponentWrapper>
        <CustomList listData={htmlListToArray(bulletPoints)} />
      </ComponentWrapper>
      <VideoComponent videoLink={trimHTML(videoLink)} />
      <ComponentWrapper
        heading="DISCLAIMER"
        subHeading={trimHTML(disclaimer)}
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
