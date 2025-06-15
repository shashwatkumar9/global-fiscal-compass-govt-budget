
import { useParams, Navigate } from 'react-router-dom';

const ToolRedirect = () => {
  const { countrySlug, toolSlug } = useParams();
  
  // Redirect to the default English version of the tool page
  return <Navigate to={`/tool/en/${countrySlug}/${toolSlug}`} replace />;
};

export default ToolRedirect;
