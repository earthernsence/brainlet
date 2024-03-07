import { Navbar } from "./_components/Navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  <div className="h-full pt-40">
    <Navbar />
    <main className="h-full pt-40">
      {children}
    </main>
  </div>;
};

export default MarketingLayout;