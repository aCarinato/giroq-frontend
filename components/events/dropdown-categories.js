import classes from './dropdown-categories.module.css';

function DropdownCategories(props) {
  const {
    id,
    index,
    cat,
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
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

    const newTypesCheck = [...categoryCheck];
    newTypesCheck[idx] = !newTypesCheck[idx];
    setCategoryCheck(newTypesCheck);

    const newCategoryGroupCheck = [...categoryGroupCheck];
    if (newTypesCheck[idx] === false) {
      //   console.log(categoryGroupCheck);

      if (id === '0') {
        newCategoryGroupCheck[0] = false;
      }
      if (id === '6') {
        newCategoryGroupCheck[1] = false;
      }
      if (id === '14') {
        newCategoryGroupCheck[2] = false;
      }
      if (id === '21') {
        newCategoryGroupCheck[3] = false;
      }
      setCategoryGroupCheck(newCategoryGroupCheck);
    }

    // Check if all elements of that category group are positive. If so,
    if (newTypesCheck[idx]) {
      if (id === '0') {
        const min = 0;
        const max = 6;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);

        if (condition) {
          newCategoryGroupCheck[0] = true;
        }
      }
      if (id === '6') {
        const min = 6;
        const max = 14;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);
        if (condition) {
          newCategoryGroupCheck[1] = true;
        }
      }
      if (id === '14') {
        const min = 14;
        const max = 21;

        const slicedCategoryCheck = newTypesCheck.slice(min, max);
        const condition = slicedCategoryCheck.every((e) => e === true);
        if (condition) {
          newCategoryGroupCheck[2] = true;
        }
      }
      if (id === '21') {
        const min = 21;
        const max = 26;

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
    <div onClick={handleCategoryChange} className={classes.container} key={idx}>
      {categoryCheck[idx] ? (
        <div className={classes.checkmarkOuter}>
          {+id < 6 && <div className={classes.checkmarkSelectedRed}></div>}
          {+id > 5 && +id < 14 && (
            <div className={classes.checkmarkSelectedBlue}></div>
          )}
          {+id > 13 && +id < 21 && (
            <div className={classes.checkmarkSelectedYellow}></div>
          )}
          {+id > 20 && <div className={classes.checkmarkSelectedCyan}></div>}
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
