import AppProviders from '../components/layout/AppProviders';
import { ASKCODER_LOGO_URL } from '../config/logo';

import '../styles/tailwind.css';
import '../styles/global.css';
import '../components/Alert/Alert.styles.scss';
import '../components/molecules/PostItem/PostItem.styles.scss';
import '../components/molecules/SearchBox/SearchBox.styles.scss';
import '../components/molecules/Spinner/Spinner.styles.scss';
import '../components/molecules/TagBadge/TagBadge.styles.scss';
import '../components/molecules/UserCard/UserCard.styles.scss';
import '../components/organisms/AuthForm/AuthForm.styles.scss';
import '../components/organisms/Footer/Footer.styles.scss';
import '../components/organisms/Header/Header.styles.scss';
import '../components/organisms/LayoutWrapper/LayoutWrapper.styles.scss';
import '../components/organisms/LayoutWrapper/RightSideBar/RightSideBar.styles.scss';
import '../components/organisms/LayoutWrapper/RightSideBar/SideBarWidget/SideBarWidget.styles.scss';
import '../components/organisms/LayoutWrapper/RightSideBar/TagsWidget/TagsWidget.styles.scss';
import '../components/organisms/LayoutWrapper/RightSideBar/TagsWidget/TagsWidgetItem.styles.scss';
import '../components/organisms/LayoutWrapper/SideBar/SideBar.styles.scss';
import '../components/organisms/MarkdownEditor/MarkdownEditor.styles.scss';
import '../components/organisms/MobileSideBar/MobileSideBar.styles.scss';
import '../modules/AllTagsPage/AllTagsPage.styles.scss';
import '../modules/AllUsersPage/AllUsersPage.styles.scss';
import '../modules/AllUsersPage/UserPanel/UserPanel.styles.scss';
import '../modules/HomePage/HomePage.styles.scss';
import '../modules/NotFound/NotFound.styles.scss';
import '../modules/Post/AnswerSection/AnswerForm/AnswerForm.styles.scss';
import '../modules/Post/AnswerSection/AnswerItem/AnswerItem.styles.scss';
import '../modules/Post/AnswerSection/AnswerSection.styles.scss';
import '../modules/Post/Post.styles.scss';
import '../modules/Post/QuestionSection/CommentCell/CommentCell.styles.scss';
import '../modules/Post/QuestionSection/PostCell/PostCell.styles.scss';
import '../modules/Post/QuestionSection/QuestionSection.styles.scss';
import '../modules/Post/QuestionSection/VoteCell/VoteCell.styles.scss';
import '../modules/PostForm/AskForm/AskForm.styles.scss';
import '../modules/PostForm/AskWidget/AskWidget.styles.scss';
import '../modules/PostForm/PostForm.styles.scss';
import '../modules/ProfilePage/ExternalUserDetails/ExternalUserDetails.styles.scss';
import '../modules/ProfilePage/ProfilePage.styles.scss';
import '../modules/ProfilePage/ProfileSettings/ProfileSettings.styles.scss';
import '../modules/ProfilePage/UserActivity/UserActivity.styles.scss';
import '../modules/ProfilePage/UserSection/AvatarCard/AvatarCard.styles.scss';
import '../modules/ProfilePage/UserSection/ContentCard/ContentCard.styles.scss';
import '../modules/ProfilePage/UserSection/UserSection.styles.scss';
import '../modules/QuestionsPage/QuestionsPage.styles.scss';
import '../modules/Register/Caption/Caption.styles.scss';
import '../modules/Register/Register.styles.scss';
import '../modules/TagPage/TagPage.styles.scss';
import '../modules/ContentPage/ContentPage.styles.scss';
import '../modules/BlogPage/BlogPage.styles.scss';
import '../modules/BlogDetailPage/BlogDetailPage.styles.scss';

export const metadata = {
  title: {
    default: 'AskCoder - Where Developers Learn, Share, & Build Careers',
    template: '%s - AskCoder',
  },
  description: 'AskCoder - where developers learn, share, and build careers',
  icons: {
    icon: ASKCODER_LOGO_URL,
  },
};

const RootLayout = ({children}) => (
  <html lang='en'>
    <head>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />
    </head>
    <body>
      <AppProviders>{children}</AppProviders>
    </body>
  </html>
);

export default RootLayout;
