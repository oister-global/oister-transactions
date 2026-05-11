"use client";

import TransactionCard from "../components/TransactionCard";
import Loading from "../loading";
import { useGetTransactionsQuery } from "../store/services/transactionsApi";

export default function Page() {
  const { data, isLoading, isError } = useGetTransactionsQuery();

  if (isLoading) return <Loading />;
  if (isError) throw new Error();

  return (
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
