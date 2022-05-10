import { Fragment } from 'react';
import MainHeader from './main-header';
import ColorBar from './color-bar';

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <ColorBar />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
