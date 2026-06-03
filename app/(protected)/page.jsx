"use client";

import { getUserData, subscribeAuth } from "@/app/lib/auth";
import { useSyncExternalStore } from "react";
import TransactionCard from "../components/TransactionCard";
import Loading from "../loading";
import { useGetTransactionsQuery } from "../store/services/transactionsApi";

function getRmDisplayName(name) {
  if (!name || typeof name !== "string") return "there";
  const firstName = name.trim().split(/\s+/).filter(Boolean)[0];
  return firstName || "there";
}

export default function Page() {
  const userData = useSyncExternalStore(subscribeAuth, getUserData, () => null);
  const { data, isLoading, isError } = useGetTransactionsQuery();

  if (isLoading) return <Loading />;
  if (isError) throw new Error();

  const rmName = getRmDisplayName(userData?.name);

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-[#e8eaef] bg-[#fcfcfd] px-3 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <h1 className="text-base font-semibold text-[#28283B] sm:text-lg">
          Welcome, {rmName}
        </h1>
        <p className="text-xs font-normal leading-snug text-[#696C7A] sm:text-sm">
          You can use this platform to discover investment opportunities for your
          clients. Browse available transactions below, open any card for full
          details, and express interest when a deal fits your client&apos;s needs.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data?.data?.map(
          ({
            _id,
            heading,
            index,
            subHeading,
            image,
            status,
            type,
            valuation,
            minInvestment,
            instrumentType,
            pricePerShare,
            isInterested,
          }, index1) => (
            <TransactionCard
              key={index1}
              id={_id}
              index={index}
              heading={heading}
              subHeading={subHeading}
              image={image}
              status={status}
              type={type}
              valuation={valuation}
              minInvestment={minInvestment}
              instrumentType={instrumentType}
              pricePerShare={pricePerShare}
              isInterested={isInterested}
            />
          ),
        )}
      </div>
    </div>
  );
}
