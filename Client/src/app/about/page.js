import PageShell from '../../components/layout/PageShell';
import AboutPage from '../../modules/ContentPage/AboutPage.component';

export const metadata = {
  title: 'About',
};

const AboutRoute = () => (
  <PageShell>
    <AboutPage />
  </PageShell>
);

export default AboutRoute;
