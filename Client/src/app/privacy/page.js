import PageShell from '../../components/layout/PageShell';
import PrivacyPage from '../../modules/ContentPage/PrivacyPage.component';

export const metadata = {
  title: 'Privacy Policy',
};

const PrivacyRoute = () => (
  <PageShell>
    <PrivacyPage />
  </PageShell>
);

export default PrivacyRoute;
