import PortfolioTemplate from "@/templates/designer-dark-bento";
import portfolioData from "@/data/portfolio.json";

export default function Home() {
  return <PortfolioTemplate data={portfolioData} />;
}
