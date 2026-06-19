import PageShell from '../components/layout/PageShell';
import HomePage from '../modules/HomePage/HomePage.component';

export const metadata = {
  title: 'AskCoder - Where Developers Learn, Share, & Build Careers',
};

const HomeRoute = () => (
  <PageShell>
    <HomePage />
  </PageShell>
);

export default HomeRoute;
