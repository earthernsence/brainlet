const MarketingLayout = ({
  children
}: {
  children: React.ReactNode
}) => (
  <div className="h-full">
    <main className="h-full pt-40">
      { children }
    </main>
  </div>
);

export default MarketingLayout;