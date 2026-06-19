import PageShell from '../../../components/layout/PageShell';
import TagPage from '../../../modules/TagPage/TagPage.component';

export const metadata = {
  title: 'Tag',
};

const TagRoute = () => (
  <PageShell>
    <TagPage />
  </PageShell>
);

export default TagRoute;
