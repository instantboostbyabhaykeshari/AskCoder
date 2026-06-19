import PageShell from '../../components/layout/PageShell';
import AllUsersPage from '../../modules/AllUsersPage/AllUsersPage.component';

export const metadata = {
  title: 'Users',
};

const UsersRoute = () => (
  <PageShell>
    <AllUsersPage />
  </PageShell>
);

export default UsersRoute;
