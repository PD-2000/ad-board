import {Button,  Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {IMAGES_URL} from '../../../config';

const Ad = ({title, price, location, publishedDate, shortDescription, image, id}) => {
  return (
    <Col className="py-4 col-12 col-sm-6 col-lg-4">
      <Card>
        <Card.Body >
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <p><b>{price}</b></p>
            <p><i>{location}</i></p>
            {/* <p><i>{publishedDate}</i></p> */}
            <p>{shortDescription}</p>
          </Card.Text>
          <Link key={id} to={"/ad/" + id}>
            <Button variant="success">Read more</Button>
          </Link> 
        </Card.Body>
        <Card.Img variant="top" src={IMAGES_URL + image} />
      </Card>
    </Col>
  );
}

export default Ad;