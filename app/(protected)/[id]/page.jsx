"use client";

import BusinessSegments from "@/app/components/BusinessSegments";
import ButtonsGroup from "@/app/components/ButtonsGroup";
import CapTable from "@/app/components/CapTable";
import CompanyNews from "@/app/components/CompanyNews";
import ComponentWrapper from "@/app/components/ComponentWrapper";
import FAQs from "@/app/components/FAQs";
import FinancialProjections from "@/app/components/Financial";
import FinancialChart from "@/app/components/FinancialChart";
import InvestmentThesis from "@/app/components/InvestmentThesis";
import KeyHighlights from "@/app/components/KeyHighlights";
import KeyInvestors from "@/app/components/KeyInvestors";
import LeadershipTeam from "@/app/components/LeadershipTeam";
import Modal from "@/app/components/Modal";
import RelatedTransactions from "@/app/components/RelatedTransactions";
import ShareholdingSection from "@/app/components/ShareholdingSection";
import ValuationSection from "@/app/components/ValuationSection";
import MobileSectionNav from "@/app/components/MobileSectionNav";
import SideNav from "@/app/components/SideNav";
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

const KEY_HIGHLIGHTS = [
  { title: "Fastest Growing Grooming Brand", subtitle: "100% revenue growth (9MFY26)" },
  { title: "Market Leader", subtitle: "30% share in Quick Com. in trimmers" },
  { title: "Digital First Brand", subtitle: "73% of Revenue from D2C & Marketplaces driving profitable growth" },
  { title: "Highest Brand Recall", subtitle: "52% share of voice" },
];

const SECTIONS = [
  { id: "highlights", label: "Key Highlights" },
  { id: "thesis", label: "Investment Thesis" },
  { id: "financial", label: "Financial" },
  { id: "shareholding", label: "Shareholding" },
  { id: "valuation", label: "Valuation" },
  { id: "leadership", label: "Leadership" },
  { id: "cap-table", label: "Cap Table" },
  { id: "news", label: "Company News" },
  { id: "video", label: "Video" },
  { id: "faqs", label: "FAQs" },
  { id: "investors", label: "Key Investors" },
  { id: "related", label: "Related" },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { data: { data = {} } = {}, isLoading, isError } = useGetTransactionQuery({ id });
  const [showInterest, { isLoading: isShowInterestLoading }] = useShowInterestMutation();

  if (isLoading) return <Loading />;
  if (isError) notFound();

  const { heading, subHeading, disclaimer, bulletPoints, deckLink, videoLink, index, isInterested } = data || {};

  return (
    <div className="flex flex-col gap-0">
      {/* Hero image */}
      <div className="relative left-1/2 xxs:aspect-[1928/400] sm:aspect-[1928/280] w-screen max-w-[100vw] shrink-0 -translate-x-1/2 overflow-hidden xxs:-mt-3 sm:-mt-8">
        <Image
          src={backgroundImage(index)}
          alt={trimHTML(heading) || "background image"}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Sticky company header */}
      <div className="sticky top-20 z-20 -mx-3 sm:-mx-8 px-3 sm:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4" style={{ background: "linear-gradient(90deg, #eef0fb 0%, #e0e7ff 100%)", borderBottom: "1px solid #c7d2fe" }}>
        <div className="flex items-center gap-2 min-w-0">
          <ChevronIcon onClick={() => router.back()} color="#28283B" />
          <h1 className="text-base sm:text-2xl font-bold text-[#28283B] truncate leading-tight">
            {trimHTML(heading)}
          </h1>
        </div>
        <ButtonsGroup
          text="Show Deck"
          text1="I'm Interested"
          onClick={() => window.open(trimHTML(deckLink), "_blank")}
          onClick1={async () => {
            const response = await showInterest({ id });
            if (response?.data) setShowModal(true);
          }}
          hideButton1={isInterested}
          isLoading1={isShowInterestLoading}
        />
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#696C7A] leading-relaxed py-4 border-b border-[#e8eaef] -mx-3 sm:-mx-8 px-3 sm:px-8 bg-white">
        {trimHTML(subHeading)}
      </p>

      {/* Business Segments — full width, below subheading */}
      <div className="pt-6">
        <BusinessSegments />
      </div>

      <MobileSectionNav sections={SECTIONS} />

      {/* Two-column layout */}
      <div className="flex gap-8 items-start pt-6">
        <SideNav sections={SECTIONS} />

        <div className="flex-1 min-w-0 flex flex-col gap-5 pb-16">
          <div id="highlights">
            <KeyHighlights listData={KEY_HIGHLIGHTS} bulletListData={htmlListToArray(bulletPoints)} />
          </div>
          <div id="thesis">
            <InvestmentThesis />
          </div>
          <div id="financial">
            <FinancialProjections />
          </div>
          <div id="financial-chart">
            <FinancialChart />
          </div>
          <div id="shareholding">
            <ShareholdingSection />
          </div>
          <div id="valuation">
            <ValuationSection />
          </div>
          <div id="leadership">
            <LeadershipTeam />
          </div>
          <div id="cap-table">
            <CapTable />
          </div>
          <div id="news">
            <CompanyNews companyName="Bombay Shaving" />
          </div>
          <div id="video">
            <VideoComponent videoLink={trimHTML(videoLink)} />
          </div>
          <div id="faqs">
            <FAQs />
          </div>
          <div id="investors">
            <ComponentWrapper heading="Key Investors">
              <KeyInvestors />
            </ComponentWrapper>
          </div>
          <div id="related">
            <RelatedTransactions currentId={id} />
          </div>
          <ComponentWrapper heading="Disclaimer" subHeading={trimHTML(disclaimer)} />
        </div>
      </div>

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
