import {useDispatch, useSelector} from 'react-redux';
import {editAd, getAdById} from '../../../redux/adsRedux';
import {Navigate, useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import AdForm from '../AdForm/AdForm';

const AdFormEdit = () => {
  const {id} = useParams();
  const adData = useSelector(state => getAdById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = ad => {
    dispatch(editAd({...ad, id}));
    navigate("/");
  }; 

  if(!adData) {
    return <Navigate to="/" />
  }
  return (
    <div>
      <AdForm
        actionText="Edit ad"
        action={handleEdit}
        title={adData.title}
        price={adData.price}
        author={adData.author}
        location={adData.location}
        publishedDate={adData.publishedDate}
        image={adData.image}
        shortDescription={adData.shortDescription}
        content={adData.content}
      />
    </div>
  );
}

export default AdFormEdit;