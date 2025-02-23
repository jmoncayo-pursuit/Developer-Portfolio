import { useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

export function PageWrapper({ children, pageName }) {
  const { setCurrentPage, setCurrentContent } = useNavigation();

  useEffect(() => {
    setCurrentPage(pageName);
    setCurrentContent({
      section: pageName,
      content: `Content for ${pageName} page`,
    });
  }, [pageName, setCurrentPage, setCurrentContent]);

  return <div className='page-wrapper'>{children}</div>;
}
