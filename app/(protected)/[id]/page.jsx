"use client";

import ButtonsGroup from "@/app/components/ButtonsGroup";
import ComponentWrapper from "@/app/components/ComponentWrapper";
import Modal from "@/app/components/Modal";
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
import Loading from "@/app/loading";
import KeyHighlights from "@/app/components/KeyHighlights";
import LeadershipTeam from "@/app/components/LeadershipTeam";
import KeyInvestors from "@/app/components/KeyInvestors";
import FAQs from "@/app/components/FAQs";
import FinancialProjections from "@/app/components/Financial";
import CapTable from "@/app/components/CapTable";
import ShareholdingSection from "@/app/components/ShareholdingSection";
import CompanyNews from "@/app/components/CompanyNews";
import RelatedTransactions from "@/app/components/RelatedTransactions";

const KEY_HIGHLIGHTS = [
  {
    title: "Fastest Growing Grooming Brand",
    subtitle: "100% revenue growth (9MFY26)",
  },
  {
    title: "Market Leader",
    subtitle: "30% share in Quick Com. in trimmers",
  },
  {
    title: "Digital First Brand",
    subtitle:
      "73% of Revenue from D2C & Marketplaces driving profitable growth",
  },
  {
    title: "Highest Brand Recall",
    subtitle: "52% share of voice",
  },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { data: { data = {} } = {}, isLoading, isError } = useGetTransactionQuery({
    id,
  });
  const [showInterest, { isLoading: isShowInterestLoading }] =
    useShowInterestMutation();

  if (isLoading) return <Loading />;
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

  return (
    <div className="flex flex-col sm:gap-8 xxs:gap-6">
      <div className="relative left-1/2 xxs:aspect-1928/400 sm:aspect-1928/300 w-screen max-w-[100vw] shrink-0 -translate-x-1/2 overflow-hidden xxs:-mt-3 sm:-mt-8">
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
      <div className="sticky xxs:top-22  sm:top-24 z-20">
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
      <KeyHighlights listData={KEY_HIGHLIGHTS} bulletListData={htmlListToArray(bulletPoints)} />
      <FinancialProjections />
      <ShareholdingSection />
      <LeadershipTeam />

      <CapTable />
      <CompanyNews companyName="Bombay Shaving" />
      <VideoComponent videoLink={trimHTML(videoLink)} />
      <FAQs />
      <ComponentWrapper>
        <KeyInvestors />
      </ComponentWrapper>
      <RelatedTransactions currentId={id} />
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
