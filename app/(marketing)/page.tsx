import { Header } from "./_components/Header";

const MarketingPage = () => (
  <main className="min-h-full flex flex-col">
    <section className="flex flex-col items-center justify-center
                        text-center gap-y-8 flex-1 px-6 pb-10
                        md:justify-start"
    >
      <Header />
    </section>
  </main>
);

export default MarketingPage;