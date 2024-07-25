import { } from "react";
import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import LatestBooks from "../components/LatestBooks";
import DiscountBooks from "../components/DiscountBooks";


const Home = () => {
  
  return (
    <>
      <Banner />
      <LatestBooks />
      <BestSeller />
      <DiscountBooks />
    </>
  );
}

export default Home;
