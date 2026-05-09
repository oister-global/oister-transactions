"use client";

import TransactionCard from "../components/TransactionCard";
import { useGetTransactionsQuery } from "../store/services/transactionsApi";
import PageLoader from "../components/PageLoader";

export default function Page() {
  const { data, isLoading } = useGetTransactionsQuery(null);

  if (isLoading) return <PageLoader />;

  return (
    <div className="grid grid-cols-2 gap-4">
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
        }) => (
          <TransactionCard
            key={index}
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
  );
}
