// pages/editCountry.js
import { useRouter } from 'next/router';
import EditPopup from './EditCountryForm';

const EditCountry = ({ params }) => {
    const { query } = useRouter();
    console.log('Query Parameters:', query);
    const { countryId } = params;


  return (
    <div>
      <h1>Edit Country</h1>
      <EditPopup countryId={countryId} token={token} />
    </div>
  );
};

export default EditCountry;
