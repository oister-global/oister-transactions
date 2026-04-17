export default function ComponentWrapper({
  heading = "",
  subHeading = "",
  children = null,
}) {
  return (
    <section className="card-wrapper">
      <div className="flex flex-col gap-8">
        {(heading || subHeading) && (
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-[#28283B]">
              {heading.toUpperCase()}
            </h2>
            <p className="text-base font-normal text-[#696C7A]">{subHeading}</p>
          </div>
        )}
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </section>
  );
}
