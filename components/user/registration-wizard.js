import classes from './registration-wizard.module.css';

export default function RegistrationWizard({ activeStep = 0 }) {
  return (
    <div className={`${classes.container}`}>
      {['Credenziali (1/3)', 'Preferenze (2/3)', 'Fine (3/3)'].map(
        (step, index) => (
          <div key={step} className={classes.item}>
            <div
              className={`
           ${
             index <= activeStep
               ? classes.activeItemTxt
               : classes.inactiveItemTxt
           }
           `}
            >
              {step}
            </div>
            <div
              className={`
           ${index <= activeStep ? classes.activeItemBottom : ''}
           `}
            ></div>
          </div>
        )
      )}
    </div>
  );
}
