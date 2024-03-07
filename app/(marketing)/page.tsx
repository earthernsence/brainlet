import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Heroes } from "./_components/Heroes";

const MarketingPage = () => (
  <div className="min-h-full flex flex-col">
    <div className="flex flex-col items-center justify-center
                        text-center gap-y-8 flex-1 px-6 pb-10
                        md:justify-start"
    >
      <Header />
      <Heroes />
    </div>
    <Footer />
  </div>
);

export default MarketingPage;