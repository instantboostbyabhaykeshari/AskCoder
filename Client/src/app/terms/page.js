import PageShell from '../../components/layout/PageShell';
import TermsPage from '../../modules/ContentPage/TermsPage.component';

export const metadata = {
  title: 'Terms and Conditions',
};

const TermsRoute = () => (
  <PageShell>
    <TermsPage />
  </PageShell>
);

export default TermsRoute;
