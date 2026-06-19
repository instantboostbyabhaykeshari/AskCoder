import PageShell from '../../../components/layout/PageShell';
import Post from '../../../modules/Post/Post.component';

export const metadata = {
  title: 'Question',
};

const QuestionRoute = () => (
  <PageShell>
    <Post />
  </PageShell>
);

export default QuestionRoute;
