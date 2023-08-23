import {useDispatch} from 'react-redux';
import {addAd} from '../../../redux/adsRedux';
import {useNavigate} from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import {API_URL} from '../../../config';

const AdFormAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = ad => {
    const fd = AdForm.fd;
    const options = {
      method: 'POST',
      body: fd
    }

    fetch(`${API_URL}/api/ads`, options)
      .then(res => {
        setTimeout(() => {
          dispatch(addAd(ad));
          navigate('/');
        }, 1000);
      })
  };

  return (
    <div>
      <AdForm actionText="Post advertisement" action={handleAdd}/>
    </div>
  );
}

export default AdFormAdd;