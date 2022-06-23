import RegistrationWizard from '../components/user/registration-wizard';
import Categories from '../components/filter/Categories';
import Wrapper5095 from '../components/UI/Wrapper5095';
import { Fragment, useState } from 'react';

function Registration() {
  const [categoryCheck, setCategoryCheck] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [categoryGroupCheck, setCategoryGroupCheck] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [filterCtgrTouch, setFilterCtgrTouch] = useState(false);

  return (
    <Fragment>
      <RegistrationWizard activeStep={1} />
      <br></br>
      <Wrapper5095>
        <Categories
          categoryCheck={categoryCheck}
          setCategoryCheck={setCategoryCheck}
          categoryGroupCheck={categoryGroupCheck}
          setCategoryGroupCheck={setCategoryGroupCheck}
          setFilterCtgrTouch={setFilterCtgrTouch}
        />
      </Wrapper5095>
      <br></br>
    </Fragment>
  );
}

export default Registration;
