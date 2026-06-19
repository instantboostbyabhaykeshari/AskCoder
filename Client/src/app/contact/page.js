import PageShell from '../../components/layout/PageShell';
import ContactPage from '../../modules/ContentPage/ContactPage.component';

export const metadata = {
  title: 'Contact',
};

const ContactRoute = () => (
  <PageShell>
    <ContactPage />
  </PageShell>
);

export default ContactRoute;
