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
import MobileSectionNav from "@/app/components/MobileSectionNav";
import Modal from "@/app/components/Modal";
import RelatedTransactions from "@/app/components/RelatedTransactions";
import ShareholdingSection from "@/app/components/ShareholdingSection";
import SideNav from "@/app/components/SideNav";
import ValuationSection from "@/app/components/ValuationSection";
import VideoComponent from "@/app/components/VideoComponent";
import backgroundImage from "@/app/lib/backgroundImage";
import { htmlListToHtmlArray, trimHTML } from "@/app/lib/htmlConversion";
import Loading from "@/app/loading";
import {
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useShowInterestMutation,
} from "@/app/store/services/transactionsApi";
import { ChevronIcon } from "@/public/svg";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";

const cleanText = (html) => (trimHTML(html) || "").trim();

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { data: { data = {} } = {}, isLoading, isError } = useGetTransactionQuery({ id });
  const [showInterest, { isLoading: isShowInterestLoading }] = useShowInterestMutation();
  // Used only to know whether the "Related" section will have content, so its
  // sidebar entry isn't shown when there are no other transactions to render.
  const { data: transactionsList } = useGetTransactionsQuery();

  if (isLoading) return <Loading />;
  if (isError) notFound();

  const {
    heading,
    subHeading,
    businessSegments,
    businessSegmentsDisclaimer,
    keyHighlights,
    keyHighlightsBullets,
    keyHighlightsDisclaimer,
    investmentThesis,
    investmentThesisDisclaimer,
    financialColumns,
    financialRows,
    financialBullets,
    financialDisclaimer,
    shareholdingAndLastRound,
    shareholdingAndLastRoundDisclaimer,
    valuationContent,
    valuationDisclaimer,
    keyManagementTeam,
    seniorLeadershipTeam,
    keyManagementTeamDisclaimer,
    capTableHeading,
    capTableDescription,
    capTableDisclaimer,
    capTableRows,
    keyInvestors,
    keyInvestorsDisclaimer,
    faqs,
    faqsDisclaimer,
    disclaimer,
    deckLink,
    videoLink,
    index,
    isInterested,
  } = data || {};

  const headingText = trimHTML(heading);
  const subHeadingText = cleanText(subHeading);
  const deckHref = cleanText(deckLink);
  const videoSrc = cleanText(videoLink);
  const disclaimerText = cleanText(disclaimer);

  const highlightCards = Array.isArray(keyHighlights) ? keyHighlights : [];
  const highlightBullets = htmlListToHtmlArray(keyHighlightsBullets);
  const financialRowsArr = Array.isArray(financialRows) ? financialRows : [];
  const hasLeadership =
    (Array.isArray(keyManagementTeam) && keyManagementTeam.length > 0) ||
    (typeof seniorLeadershipTeam === "string" && seniorLeadershipTeam.trim().length > 0);
  const hasRelated =
    Array.isArray(transactionsList?.data) &&
    transactionsList.data.some((t) => t && t._id && t._id !== id);

  // Build the section list once; each entry renders only when it has data, and
  // the same list drives the nav so links never point at hidden/empty sections.
  // `cap-table` / `news` / `related` are always shown (static or self-managing).
  const sections = [
    (highlightCards.length > 0 || highlightBullets.length > 0) && {
      id: "highlights",
      label: "Key Highlights",
      node: <KeyHighlights listData={highlightCards} bulletListData={highlightBullets} disclaimer={keyHighlightsDisclaimer} />,
    },
    hasLeadership && {
      id: "leadership",
      label: "Leadership",
      node: <LeadershipTeam team={keyManagementTeam} seniorLeadership={seniorLeadershipTeam} disclaimer={keyManagementTeamDisclaimer} />,
    },
    Array.isArray(investmentThesis) && investmentThesis.length > 0 && {
      id: "thesis",
      label: "Investment Thesis",
      node: <InvestmentThesis thesis={investmentThesis} disclaimer={investmentThesisDisclaimer} />,
    },
    financialRowsArr.length > 0 && {
      id: "financial",
      label: "Financial",
      node: (
        <div className="flex flex-col gap-5">
          <FinancialProjections columns={financialColumns} rows={financialRowsArr} bullets={financialBullets} disclaimer={financialDisclaimer} />
          <FinancialChart columns={financialColumns} rows={financialRowsArr} />
        </div>
      ),
    },
    htmlListToHtmlArray(shareholdingAndLastRound).length > 0 && {
      id: "shareholding",
      label: "Shareholding",
      node: <ShareholdingSection content={shareholdingAndLastRound} disclaimer={shareholdingAndLastRoundDisclaimer} />,
    },
    Boolean(valuationContent) && {
      id: "valuation",
      label: "Valuation",
      node: <ValuationSection content={valuationContent} disclaimer={valuationDisclaimer} />,
    },
    Array.isArray(capTableRows) && capTableRows.length > 0 && {
      id: "cap-table",
      label: "Cap Table",
      node: (
        <CapTable
          heading={capTableHeading}
          description={capTableDescription}
          disclaimer={capTableDisclaimer}
          rows={capTableRows}
        />
      ),
    },
    Boolean(videoSrc) && {
      id: "video",
      label: "Video",
      node: <VideoComponent videoLink={videoSrc} />,
    },
    Array.isArray(faqs) && faqs.length > 0 && {
      id: "faqs",
      label: "FAQs",
      node: <FAQs faqs={faqs} companyName={companyName} disclaimer={faqsDisclaimer} />,
    },
    Array.isArray(keyInvestors) && keyInvestors.length > 0 && {
      id: "investors",
      label: "Key Investors",
      node: (
        <ComponentWrapper heading="Key Investors">
          <KeyInvestors investors={keyInvestors} disclaimer={keyInvestorsDisclaimer} />
        </ComponentWrapper>
      ),
    },
    hasRelated && {
      id: "related",
      label: "Related",
      node: <RelatedTransactions currentId={id} />,
    },
  ].filter(Boolean);

  const navSections = sections.map(({ id, label }) => ({ id, label }));

  return (
    <div className="flex flex-col gap-0">
      {/* Hero image */}
      <div className="relative left-1/2 xxs:aspect-[1928/400] sm:aspect-[1928/280] w-screen max-w-[100vw] shrink-0 -translate-x-1/2 overflow-hidden xxs:-mt-3 sm:-mt-8">
        <Image
          src={backgroundImage(index)}
          alt={headingText || "background image"}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Sticky company header */}
      <div className="sticky top-20 z-20 -mx-3 sm:-mx-8 px-3 sm:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4" style={{ background: "linear-gradient(90deg, #eef0fb 0%, #e0e7ff 100%)", borderBottom: "1px solid #c7d2fe" }}>
        <div className="flex items-center gap-2 min-w-0">
          <ChevronIcon onClick={() => router.push("/")} color="#28283B" />
          <h1 className="text-base sm:text-2xl font-bold text-[#28283B] truncate leading-tight">
            {headingText}
          </h1>
        </div>
        <ButtonsGroup
          text="Show Deck"
          text1="I'm Interested"
          onClick={() => {
            if (deckHref) window.open(deckHref, "_blank", "noopener,noreferrer");
          }}
          onClick1={async () => {
            const response = await showInterest({ id });
            if (response?.data) setShowModal(true);
          }}
          hideButton1={isInterested}
          isLoading1={isShowInterestLoading}
        />
      </div>

      {/* Description */}
      {subHeadingText && (
        <p className="text-sm sm:text-base text-[#696C7A] leading-relaxed py-4 border-b border-[#e8eaef] -mx-3 sm:-mx-8 px-3 sm:px-8 bg-white">
          {subHeadingText}
        </p>
      )}

      {/* Business Segments — full width, below subheading */}
      <div className="pt-6 empty:hidden">
        <BusinessSegments SEGMENTS={businessSegments} disclaimer={businessSegmentsDisclaimer} />
      </div>

      <MobileSectionNav sections={navSections} />

      {/* Two-column layout */}
      <div className="flex gap-8 items-start pt-6">
        <SideNav sections={navSections} />

        <div className="flex-1 min-w-0 flex flex-col gap-5 pb-16">
          {sections.map(({ id, node }) => (
            <div key={id} id={id} className="empty:hidden">
              {node}
            </div>
          ))}
          {disclaimerText && (
            <ComponentWrapper heading="Disclaimer" subHeading={disclaimerText} />
          )}
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
