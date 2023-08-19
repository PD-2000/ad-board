import {useSelector} from 'react-redux';
import {getAllAds} from '../../../redux/adsRedux';
import {Row} from 'react-bootstrap';
import Ad from '../../pages/Ad/Ad';

const Ads = () => {
  const ads = useSelector(getAllAds);

	return (
    <Row className="justify-content">
      {ads.map(ad => <Ad key={ad.id} {...ad} />)}
    </Row>
	);
}

export default Ads;