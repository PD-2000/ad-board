import {useDispatch} from 'react-redux';
import {addAd} from '../../../redux/adsRedux';
import {useNavigate} from 'react-router-dom';
import AdForm from '../AdForm/AdForm';

const AdFormAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = ad => {
    navigate("/");
    dispatch(addAd(ad));
  };

  return (
    <div>
      <AdForm actionText="Post advertisement" action={handleAdd}/>
    </div>
  );
}

export default AdFormAdd;