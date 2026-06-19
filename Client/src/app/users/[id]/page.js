import PageShell from '../../../components/layout/PageShell';
import ProfilePage from '../../../modules/ProfilePage/ProfilePage.component';

export const metadata = {
  title: 'Users',
};

const UserRoute = () => (
  <PageShell>
    <ProfilePage />
  </PageShell>
);

export default UserRoute;
