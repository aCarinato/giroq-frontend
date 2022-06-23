import { Fragment } from 'react';
import CATEGORIES from '../../data/categories';

import DropdownCategories from '../events/dropdown-categories';

import classes from './Categories.module.css';

function Categories(props) {
  const {
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
    setFilterCtgrTouch,
    // nEvents,
    // nTotEvents,
  } = props;

  const selectCategoryGroup = (id) => {
    setFilterCtgrTouch(true);
    const newTypesCheck = [...categoryCheck];
    const newCategoryGroupCheck = [...categoryGroupCheck];

    // GUSTO E DIVERTIMENTO
    if (id === '0') {
      newCategoryGroupCheck[0] = !newCategoryGroupCheck[0];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 0; idx < 5; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[0]) {
          newTypesCheck[idx] = newCategoryGroupCheck[0];
          setCategoryCheck(newTypesCheck);
        }
      }

      // GA
      // if (newCategoryGroupCheck[0]) {
      //   // console.log('Selezionato gusto e divertimento');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Selezionato gusto e divertimento',
      //     label: '',
      //     value: '9',
      //   });
      // } else {
      //   // console.log('Deselezionato gusto e divertimento');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Deselezionato gusto e divertimento',
      //     label: '',
      //     value: '9',
      //   });
      // }
    }

    // CULTURA E SPETTACOLO
    if (id === '5') {
      newCategoryGroupCheck[1] = !newCategoryGroupCheck[1];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 5; idx < 13; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[1]) {
          newTypesCheck[idx] = newCategoryGroupCheck[1];
          setCategoryCheck(newTypesCheck);
        }
      }

      // GA
      // if (newCategoryGroupCheck[1]) {
      //   // console.log('Selezionato cultura e spettacolo');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Selezionato cultura e spettacolo',
      //     label: '',
      //     value: '9',
      //   });
      // } else {
      //   // console.log('Deselezionato cultura e spettacolo');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Deselezionato cultura e spettacolo',
      //     label: '',
      //     value: '9',
      //   });
      // }
    }

    if (id === '13') {
      newCategoryGroupCheck[2] = !newCategoryGroupCheck[2];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 13; idx < 20; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[2]) {
          newTypesCheck[idx] = newCategoryGroupCheck[2];
          setCategoryCheck(newTypesCheck);
        }
      }

      // GA
      // if (newCategoryGroupCheck[2]) {
      //   // console.log('Selezionato sport e natura');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Selezionato sport e natura',
      //     label: '',
      //     value: '9',
      //   });
      // } else {
      //   // console.log('Deselezionato sport e natura');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Deselezionato sport e natura',
      //     label: '',
      //     value: '9',
      //   });
      // }
    }

    if (id === '20') {
      newCategoryGroupCheck[3] = !newCategoryGroupCheck[3];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 20; idx < 25; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[3]) {
          newTypesCheck[idx] = newCategoryGroupCheck[3];
          setCategoryCheck(newTypesCheck);
        }
      }

      // GA
      // if (newCategoryGroupCheck[3]) {
      //   // console.log('Selezionato expo e acquisti');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Selezionato expo e acquisti',
      //     label: '',
      //     value: '9',
      //   });
      // } else {
      //   // console.log('Deselezionato expo e acquisti');
      //   ga.event({
      //     action: 'Filter section',
      //     category: 'Deselezionato expo e acquisti',
      //     label: '',
      //     value: '9',
      //   });
      // }
    }
  };

  return (
    <div className={classes.row}>
      {/* <div className={classes.title}>
        <span className={classes['span-bold']}>Categorie</span>
      </div> */}
      {CATEGORIES.map((category) => (
        <Fragment key={category.id}>
          <div
            key={category.id}
            className={classes.container}
            onClick={() => selectCategoryGroup(category.id)}
          >
            <div className={classes.label}>{category.mainCategory}</div>
            <div className={classes.checkmarkOuter}>
              {+category.id < 5 &&
                (categoryGroupCheck[0] ? (
                  <div className={classes.checkmark}>
                    <div className={classes.checkmarkSelectedRed}></div>
                  </div>
                ) : (
                  <div className={classes.checkmark}></div>
                ))}
              {+category.id > 4 &&
                +category.id < 13 &&
                (categoryGroupCheck[1] ? (
                  <div className={classes.checkmark}>
                    <div className={classes.checkmarkSelectedBlue}></div>
                  </div>
                ) : (
                  <div className={classes.checkmark}></div>
                ))}
              {+category.id > 12 &&
                +category.id < 20 &&
                (categoryGroupCheck[2] ? (
                  <div className={classes.checkmark}>
                    <div className={classes.checkmarkSelectedYellow}></div>
                  </div>
                ) : (
                  <div className={classes.checkmark}></div>
                ))}
              {+category.id > 19 &&
                (categoryGroupCheck[3] ? (
                  <div className={classes.checkmark}>
                    <div className={classes.checkmarkSelectedCyan}></div>
                  </div>
                ) : (
                  <div className={classes.checkmark}></div>
                ))}
            </div>
          </div>

          {category.subCategories.map((cat, index) => (
            <DropdownCategories
              key={index + Number(category.id)}
              id={category.id}
              index={index}
              cat={cat}
              categoryCheck={categoryCheck}
              setCategoryCheck={setCategoryCheck}
              categoryGroupCheck={categoryGroupCheck}
              setCategoryGroupCheck={setCategoryGroupCheck}
              setFilterCtgrTouch={setFilterCtgrTouch}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Categories;
