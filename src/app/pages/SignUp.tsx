import React, { useState } from 'react';
import { signup } from '../lib/api';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

function SignUp() {
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  function handleSignUp(e: any) {
    e.preventDefault();
    signup(username, password)
      .then(e => {
        history.push('/');
      })
      .catch(e => {
        setError('sign up failed');
      });
  }

  function redirectLogin(e: any) {
    history.push("/login") 
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(15),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    photo: {
      height: '12%',
      width: '12%',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

    const classes = useStyles();

  return (
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography component="h1" variant="h3"> 
            Create your &nbsp;
            <img className={classes.photo} alt= 'stave logo' src={process.env.PUBLIC_URL + '/Stave-graphic@2x.png'}></img>
            &nbsp; account
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignUp}>
                <TextField
                  placeholder="username"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  name="username"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Username"
                />

                <TextField
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Your Password"
                  name="password"
                />

            {error ? <div>{error}</div> : null}

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
            >
              Create account
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link 
                  component="button"
                  variant="body2"
                  onClick={redirectLogin} >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}

export default SignUp;
