import PageShell from '../../components/layout/PageShell';
import BlogPage from '../../modules/BlogPage/BlogPage.component';

export const metadata = {
  title: 'Blog',
};

const BlogRoute = () => (
  <PageShell>
    <BlogPage />
  </PageShell>
);

export default BlogRoute;
