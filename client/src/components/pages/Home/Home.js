import Ads from "../../features/Ads/Ads";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const Home = props => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>All advertisements</h1>
        <Link key={props.id} to={"/ad/add"}>
          <Button variant="success">Add advertisement</Button>
        </Link> 
      </div>
      <Ads />
    </div>
  );
}

export default Home;