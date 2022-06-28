import classes from './reset-password-form.module.css';
import BtnDarkCTA from '../UI/BtnDarkCTA';

function ResetPasswordForm(props) {
  const { email, password, secret, formSubmit } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={formSubmit}>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <input
            className={classes.input}
            type="email"
            id="email"
            required
            ref={email}
          />
        </div>

        <div className={classes.field}>
          <label className={classes.label} htmlFor="secret">
            La tua domanda segreta:
          </label>

          <select className={classes.input}>
            <option>---</option>
            <option>Qual'è il tuo colore preferito?</option>
            <option>Qual'è il nome del tuo migliore amico?</option>
            <option>Qual'è la tua città di nascita?</option>
          </select>
          <br></br>

          <input
            className={classes.input}
            type="text"
            id="secret"
            required
            ref={secret}
          />
        </div>

        <div className={classes.field}>
          <label className={classes.label} htmlFor="password">
            Nuova Password:
          </label>
          <input
            className={classes.input}
            type="password"
            id="password"
            required
            ref={password}
          />
        </div>

        <div className={classes.field}>
          <BtnDarkCTA type="submit" label="Conferma" onCLickAction={null} />
        </div>
      </form>
      {/* {error !== null && <p>{error}</p>} */}
    </div>
  );
}

export default ResetPasswordForm;
