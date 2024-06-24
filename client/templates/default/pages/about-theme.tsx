import { NextPageFC } from '@/core/shared/models/next-fc';

const AboutTheme: NextPageFC = () => {
  return (
    <>
      <div>about theme</div>
    </>
  );
};

AboutTheme.headProps = {
  title: 'Title hello',
};

AboutTheme.layout = ({ children }) => {
  return <div style={{ background: 'tomato' }}>{children}</div>;
};

export default AboutTheme;
