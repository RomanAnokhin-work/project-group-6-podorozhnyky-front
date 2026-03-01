import ProfileInfo from "@/components/Profile/ProfileInfo/ProfileInfo";

type Props = {
  children: React.ReactNode;
  switcher: React.ReactNode;
};

const NotesLayout = ({ children, switcher }: Props) => {
  return (
    <section>
      <ProfileInfo/>
      <div>{switcher}</div>
      <div>{children}</div>
      
    </section>
  );
};

export default NotesLayout;