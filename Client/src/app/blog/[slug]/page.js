import PageShell from '../../../components/layout/PageShell';
import BlogDetailPage from '../../../modules/BlogDetailPage/BlogDetailPage.component';

export const metadata = {
  title: 'Blog',
};

const BlogDetailRoute = () => (
  <PageShell>
    <BlogDetailPage />
  </PageShell>
);

export default BlogDetailRoute;
