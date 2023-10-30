import { Link } from "react-router-dom";

interface Props {

}

const Navbar = (props: Props) => {
    return (
        <div className="flex justify-center items-center gap-10 text-3xl underline shadow-md p-5 bg-white text-black">
            <Link to="/">Home</Link>
            <Link to="/cards">Cards</Link>
            <Link to="/card-creator">Card Creator</Link>
        </div>
    );
};

export default Navbar;