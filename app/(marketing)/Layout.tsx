import { Navbar } from "./_components/Navbar";

export const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  <div className="h-full dark:bg-[#1F1F1F]">
    <Navbar />
    <main className="h-full pt-40">
      {children}
    </main>
  </div>;
};