import Banner from "../components/Banner";
import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";
import Shop from "../components/ShopByCategory"

const Home = () => {
  const items = useSelector((store) => store.items);

  return (
    <main>
      <div className="items-container">
        <Banner/>
        {items.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
      <Shop/>
    </main>
  );
};

export default Home;
