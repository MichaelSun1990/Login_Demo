import React from "react";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200,
    width: 500
  },
  resize: {},
  p: {
    margin: 0
  },
  button: {
    width: 500
  },
  textbutton: {
    width: 300
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: {
    useNextVariants: true
  }
});

class OutlinedInputAdornments extends React.Component {
  state = {
    user: "",
    password: "",
    pwdHelperText: "",
    uidHelperText: "",
    showPassword: false,
    uidError: false,
    pwdError: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickSubmit = () => {
    if ("" === this.state.user) {
      this.setState(state => ({ uidHelperText: "Required!", uidError: true }));
    } else {
      this.setState(state => ({ uidHelperText: "", uidError: false }));
    }
    if ("" === this.state.password) {
      this.setState(state => ({ pwdHelperText: "Required!", pwdError: true }));
    } else {
      this.setState(state => ({ pwdHelperText: "", pwdError: false }));
      var upperRegex = new RegExp("(?=.*[A-Z])");
      var lowerRegex = new RegExp("(?=.*[a-z])");
      var digitRegex = new RegExp("(?=.*[0-9])");
      var sizeRegex = new RegExp("(?=.{8,})");
      var helpText = "The Password should contain at least";
      if (!sizeRegex.test(this.state.password)) {
        helpText = helpText + "8 characters";
        //this.setState(state => ({ pwdHelperText:"The Password should contain at least 8 characters.", pwdError:true}));
      }
      if (!upperRegex.test(this.state.password)) {
        helpText = helpText + ", 1 Upper case character";
        //this.setState(state => ({ pwdHelperText:"The Password should contain at least 1 Upper case character.", pwdError:true}));
      }
      if (!lowerRegex.test(this.state.password)) {
        helpText = helpText + ", 1 Lower case character";
        //this.setState(state => ({ pwdHelperText:"The Password should contain at least 1 Lower case character.", pwdError:true}));
      }
      if (!digitRegex.test(this.state.password)) {
        helpText = helpText + ", at least 1 digit.";
      }
      if ("The Password should contain at least" === helpText) {
        this.setState(state => ({ pwdHelperText: "", pwdError: false }));
      } else {
        this.setState(state => ({ pwdHelperText: helpText, pwdError: true }));
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
          <p className={classNames(classes.p)}>
            <div>
              <TextField
                id="outlined-adornment-user"
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="User Name"
                value={this.state.weight}
                error={this.state.uidError}
                helperText={this.state.uidHelperText}
                onChange={this.handleChange("user")}
              />
            </div>
          </p>
          <p className={classNames(classes.p)}>
            <div>
              <TextField
                id="outlined-adornment-password"
                // used the style(can be retrive from css) to set the style for this box
                className={classNames(classes.margin, classes.textField)}
                //material ui configurable attributes
                variant="outlined"
                //use as the input type for html input tag
                //<input type="password" value={this.state.value} onChange={this.handleChange} />
                type={this.state.showPassword ? "text" : "password"}
                label="Password"
                // same value in the input tag
                value={this.state.password}
                // same onchange in the input tag
                onChange={this.handleChange("password")}
                error={this.state.pwdError}
                helperText={this.state.pwdHelperText}
                InputProps={{
                  endAdornment: (
                    //VisibilityOff/Visibility two version of the eye icon
                    // IconButton is a circle that is transparant and clickable
                    // Toggle on it will show ths button
                    // InputAdornment will need to be enclosed in either endAdornment/startAdornment
                    // to defiend the location
                    // aria-label accessability
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </p>
          <p className={classNames(classes.p)}>
            <div>
              <MuiThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classNames(classes.margin, classes.button)}
                  onClick={this.handleClickSubmit}
                >
                  Submit
                </Button>
              </MuiThemeProvider>
            </div>
          </p>
          <p className={classNames(classes.p)}>
            <div>
              <Button color="primary" className={classes.textbutton}>
                Forget password?
              </Button>
              <Button color="primary" className={classes.textbutton}>
                Don't have a account yet?Sign up
              </Button>
            </div>
          </p>
        </form>
      </div>
    );
  }
}
//Program check that can be dealed later
OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedInputAdornments);
