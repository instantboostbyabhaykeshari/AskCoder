import PageShell from '../../components/layout/PageShell';
import AllTagsPage from '../../modules/AllTagsPage/AllTagsPage.component';

export const metadata = {
  title: 'Tags',
};

const TagsRoute = () => (
  <PageShell>
    <AllTagsPage />
  </PageShell>
);

export default TagsRoute;
