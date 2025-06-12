import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/favourites">Favourites</Link>
    </>
  );
};

export default Navigation;
