import PageShell from '../../components/layout/PageShell';
import QuestionsPage from '../../modules/QuestionsPage/QuestionsPage.component';

export const metadata = {
  title: 'All Questions',
};

const QuestionsRoute = () => (
  <PageShell>
    <QuestionsPage />
  </PageShell>
);

export default QuestionsRoute;
