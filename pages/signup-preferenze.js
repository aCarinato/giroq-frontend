import RegistrationWizard from '../components/user/registration-wizard';
import Categories from '../components/filter/Categories';
import Wrapper5095 from '../components/UI/Wrapper5095';
import BtnDarkCTA from '../components/UI/BtnDarkCTA';
import ErrorParagraph from '../components/UI/ErrorParagraph';

import { Fragment, useState } from 'react';

import { useMainContext } from '../context/Context';
import axios from 'axios';
import { useRouter } from 'next/router';

function Registration() {
  const {
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    login,
  } = useMainContext();

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
  const [submissionWasClicked, setSubmissionWasClicked] = useState(false);
  const [noCategoriesSelection, setNoCategoriesSelection] = useState(true);

  // const showInputError =
  //   !filterCtgrTouch && submissionWasClicked && noCategoriesSelection;
  const showInputError = submissionWasClicked && noCategoriesSelection;

  const [error, setError] = useState(null);

  const router = useRouter();

  const signupUser = async () => {
    setSubmissionWasClicked(true);
    if (!filterCtgrTouch) {
      // setInvalidSubmit(true);
      return;
    }

    let types = [];
    const checker = categoryCheck.every((v) => v === false);
    if (checker) {
      setNoCategoriesSelection(true);
      console.log('eccgecc');
      // showInputError = true;
      return;
      // types = categoryCheck.map((tipo, index) => {
      //   return index;
      // });
    } else {
      setNoCategoriesSelection(false);
      types = categoryCheck.map((tipo, index) => {
        if (tipo) {
          return index;
        } else {
          return 1000;
        }
      });
    }

    const newUser = {
      username: signupName,
      email: signupEmail,
      password: signupPassword,
      preferences: types,
    };

    console.log(newUser);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/signup`,
        newUser
      );
      if (res.data.error) {
        setError(res.data.error);
      } else {
        login(
          res.data.username,
          res.data.email,
          res.data.token,
          res.data.preferences
        );
        router.push(`/conferma-signup`);
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          setNoCategoriesSelection={setNoCategoriesSelection}
        />
      </Wrapper5095>
      {showInputError && (
        <Wrapper5095 shadow={false}>
          <ErrorParagraph text="Seleziona almeno una categoria di eventi" />
        </Wrapper5095>
      )}
      {error !== null && (
        <Wrapper5095 shadow={false}>
          <ErrorParagraph text={error} />
        </Wrapper5095>
      )}
      <br></br>
      <Wrapper5095 shadow={false}>
        <BtnDarkCTA
          type="submit"
          label="Crea Account"
          onCLickAction={signupUser}
        />
      </Wrapper5095>
      <br></br>

      <br></br>
    </Fragment>
  );
}

export default Registration;
