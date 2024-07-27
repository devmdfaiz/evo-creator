import dynamic from "next/dynamic";

const LandingPageHeaderNoSSR = dynamic(() => import("./ui/LandingPageHeader"), {
  ssr: false,
});

const LandingPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingPageHeaderNoSSR />
      <div className="container mx-auto px-5 mb-7">{children}</div>
    </>
  );
};

export default LandingPageWrapper;
