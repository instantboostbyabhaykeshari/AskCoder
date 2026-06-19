'use client';

import LayoutWrapper from '../organisms/LayoutWrapper/LayoutWrapper.component';

const PageShell = ({children}) => (
  <LayoutWrapper>
    {children}
  </LayoutWrapper>
);

export default PageShell;
