import {Link, Navigate, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getAdById, removeAd} from '../../../redux/adsRedux';
import {Button, Modal} from 'react-bootstrap';
import {useState} from 'react';

const AdSingle = () => {
  const {id} = useParams();
  const adData = useSelector(state => {
    console.log(state);
    console.log(id);

    getAdById(state, id)
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const deleteAd = () => {
    dispatch(removeAd(id));
    handleClose();
  };

  if(!adData){
    console.log(adData);
    return <Navigate to="/" />
  }
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>{adData.title}</h2>
        <div>
          <Link key={id} to={"/ad/edit/" + id}>
            <Button variant="outline-success m-1">Edit advertisement</Button>
          </Link>
          <Button onClick={handleShow} variant="outline-danger m-1">Delete</Button>
        </div>
      </div>
      <p><b>Price: </b>{adData.price}</p>
      <p><b>Author: </b>{adData.author}</p>
      <p><b>Location: </b>{adData.location}</p>
      <p><b>Published: </b>{adData.publishedDate.toISOString().substring(0, 10)}</p>
      <p>{adData.image}</p>
      <p><b>Description: </b><span dangerouslySetInnerHTML={{__html: adData.content}}/></p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This operation will irreversibly remove the following advertisement.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">Cancel</Button>
          <Button onClick={deleteAd} variant="danger">Remove</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdSingle;