const PublicLayout = ({
  children
}: {
  children: React.ReactNode
}) => (
  <div className="h-full dark:bg-dark">
    {children}
  </div>
);

export default PublicLayout;