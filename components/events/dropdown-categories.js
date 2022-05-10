import classes from './dropdown-categories.module.css';
import * as ga from '../../lib/google-analytics';

function DropdownCategories(props) {
  const {
    id,
    index,
    cat,
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
    setFilterCtgrTouch,
  } = props;
  const idx = index + Number(id);

  const handleCategoryChange = (e) => {
    // const idx = +e.target.value;
    // console.log(idx);
    // if (idx === 0) {
    //   ga.event({
    //     action: 'set_type_A',
    //     category: 'selection',
    //     label: 'Open type A',
    //     value: 'Type A open',
    //   });
    // } else {
    // }
    setFilterCtgrTouch(true);

    const newTypesCheck = [...categoryCheck];
    newTypesCheck[idx] = !newTypesCheck[idx];
    // console.log(newTypesCheck);
    setCategoryCheck(newTypesCheck);

    const newCategoryGroupCheck = [...categoryGroupCheck];
    if (newTypesCheck[idx] === false) {
      //   console.log(categoryGroupCheck);

      if (id === '0') {
        newCategoryGroupCheck[0] = false;
        ga.event({
          action: 'Filter section',
          category: 'deselected Gusto e Divertimento',
          label: '',
          value: '9',
        });
      }
      if (id === '5') {
        newCategoryGroupCheck[1] = false;
        ga.event({
          action: 'Filter section',
          category: 'deselected Cultura e Spettacolo',
          label: '',
          value: '9',
        });
      }
      if (id === '13') {
        newCategoryGroupCheck[2] = false;
        ga.event({
          action: 'Filter section',
          category: 'deselected Sport e Natura',
          label: '',
          value: '9',
        });
      }
      if (id === '20') {
        newCategoryGroupCheck[3] = false;
        ga.event({
          action: 'Filter section',
          category: 'deselected Expo e Acquisti',
          label: '',
          value: '9',
        });
      }
      setCategoryGroupCheck(newCategoryGroupCheck);
    }

    // Check if all elements of that category group are positive. If so,
    if (newTypesCheck[idx]) {
      if (id === '0') {
        const min = 0;
        const max = 5;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);

        if (condition) {
          newCategoryGroupCheck[0] = true;
        }
      }
      if (id === '5') {
        const min = 5;
        const max = 13;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);
        if (condition) {
          newCategoryGroupCheck[1] = true;
        }
      }
      if (id === '13') {
        const min = 13;
        const max = 20;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);
        if (condition) {
          newCategoryGroupCheck[2] = true;
        }
      }
      if (id === '20') {
        const min = 20;
        const max = 25;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);
        if (condition) {
          newCategoryGroupCheck[3] = true;
        }
      }

      setCategoryGroupCheck(newCategoryGroupCheck);
    }
  };

  return (
    <div
      onClick={() => {
        handleCategoryChange();
      }}
      className={classes.container}
      key={idx}
    >
      {categoryCheck[idx] ? (
        <div className={classes.checkmarkOuter}>
          {+id < 5 && (
            <div className={classes.checkmark}>
              <div className={classes.checkmarkSelectedRed}></div>
            </div>
          )}
          {+id > 4 && +id < 13 && (
            <div className={classes.checkmark}>
              <div className={classes.checkmarkSelectedBlue}></div>
            </div>
          )}
          {+id > 12 && +id < 20 && (
            <div className={classes.checkmark}>
              <div className={classes.checkmarkSelectedYellow}></div>
            </div>
          )}
          {+id > 19 && (
            <div className={classes.checkmark}>
              <div className={classes.checkmarkSelectedCyan}></div>
            </div>
          )}
        </div>
      ) : (
        <div className={classes.checkmarkOuter}>
          <div className={classes.checkmark}></div>
        </div>
      )}

      <div className={classes.label}>{cat}</div>
    </div>
  );
}

export default DropdownCategories;
