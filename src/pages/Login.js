import React, { Component } from "react";
import Swal from "sweetalert2";

/* HOC */
import HOC from "..//HOC/mainHOC";

// Asset
import Logo from "../assets/PNG/LogoColor.png";

//Component
import { Input, Button } from "../components/custom/Index";

//Service
import { PageRoutePath } from "../utils/config";
import { getLocalStorage, setSessionStorage } from "../helper/storageService";

export class Login extends Component {
  intialForm = {
    username: {
      value: "",
      statusErr: false,
      message: "",
    },
    password: {
      value: "",
      statusErr: false,
      message: "",
    },
  };
  constructor(props) {
    super(props);

    this.state = {
      form: this.intialForm,
    };
  }

  handleChange = (name, value) => {
    const updatedForm = this.state.form;

    this.setState({
      form: {
        ...updatedForm,
        [name]: {
          ...updatedForm[name],
          value: value,
        },
      },
    });
  };

  navigateTo = (Route) => {
    const { navigate } = this.props;
    navigate(Route);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = getLocalStorage("Data User");
    if (data !== null) {
      const dataUser = data.find(
        (val) =>
          val.username === this.state.form.username.value &&
          val.password === this.state.form.password.value
      );

      if (dataUser) {
        setSessionStorage("User Information", {
          username: dataUser.username,
          email: dataUser.email,
          phone: dataUser.phone,
          // 12H in milisecond
          expiredOn: new Date().getTime() + 12 * 60 * 60 * 1000,
        });
        this.navigateTo(PageRoutePath.HOME);
      } else {
        Swal.fire({
          title: "Whoops! Something Happend",
          text: `No data matches!`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "Whoops! Something Happend",
        text: `There's no data in storage yet.`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  render() {
    return (
      <div className="bg-primary-color min-h-screen flex justify-center items-center">
        <div className="flex flex-col w-fit rounded-lg bg-white py-5 px-3 md:p-5 gap-4 md:min-w-[30%]">
          <img src={Logo} className="object-contain w-auto h-10 md:h-14" alt="logoColor "/>
          <form onSubmit={this.onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                label={"Username"}
                name={"username"}
                onChange={this.handleChange}
              />
              <Input
                label={"Password"}
                name={"password"}
                type={"password"}
                onChange={this.handleChange}
              />
            </div>
            <Button className={"w-full"} value={"Login"} type="submit" />
          </form>

          <div className="flex items-center gap-3 text-primary-color">
            <span className="grow border-b" />
            <span>or</span>
            <span className="grow border-b" />
          </div>

          <Button
            className={
              "w-full !bg-white border border-primary-color !text-primary-color"
            }
            value={"Register"}
            onClick={() => this.navigateTo(PageRoutePath.REGISTER)}
          />
        </div>
      </div>
    );
  }
}

export default HOC(Login);
