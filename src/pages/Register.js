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
import { setLocalStorage, getLocalStorage } from "../helper/storageService";

export class Register extends Component {
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
    confirmPassword: {
      value: "",
      statusErr: false,
      message: "",
    },
    email: {
      value: "",
      statusErr: false,
      message: "",
    },
    phone: {
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = this.state.form;

    console.log(password);

    if (
      password.value !== confirmPassword.value ||
      password.value === "" ||
      confirmPassword.value === ""
    ) {
      Swal.fire({
        title: "Whoops! Something Happend",
        text: `Password and confirm password should identical`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        text: `Are you sure want to submit this data?`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          this.onSubmit();
        }
      });
    }
  };

  onSubmit = () => {
    const { username, password, email, phone } = this.state.form;
    const { toast } = this.props;
    const data = getLocalStorage("Data User");

    if (data !== null) {
      if (data.find((val) => val.username === username.value)) {
        Swal.fire({
          title: "Whoops! Something Happend",
          text: `Username already exist!`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        setLocalStorage("Data User", [
          ...data,
          {
            username: username.value,
            password: password.value,
            email: email.value,
            phone: phone.value,
          },
        ]);
        toast.fire({
          icon: "success",
          title: "Data Save Successfully",
        });
        this.navigateTo(PageRoutePath.LOGIN);
      }
    } else {
      setLocalStorage("Data User", [
        {
          username: username.value,
          password: password.value,
          email: email.value,
          phone: phone.value,
        },
      ]);
      toast.fire({
        icon: "success",
        title: "Data Save Successfully",
      });
      this.navigateTo(PageRoutePath.LOGIN);
    }
  };

  render() {
    return (
      <div className="bg-primary-color min-h-screen flex justify-center items-center">
        <div className="flex flex-col w-fit rounded-lg bg-white m-4 md:m-0 py-5 px-3 md:p-5 gap-4 md:min-w-[30%]">
          <img src={Logo} alt="amarthaColor" className="object-contain w-auto h-10 md:h-14" />
          <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
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
              <Input
                label={"Confirm Password"}
                name={"confirmPassword"}
                type={"password"}
                onChange={this.handleChange}
              />

              <Input
                label={"E-Mail"}
                name={"email"}
                onChange={this.handleChange}
              />

              <Input
                label={"Phone"}
                name={"phone"}
                onChange={this.handleChange}
              />
            </div>
            <Button className={"w-full"} value={"Register"} type={"submit"} />
          </form>

          <div className="flex items-center gap-3 text-dark-gray-color">
            <span className="grow border-b" />
            <span>or</span>
            <span className="grow border-b" />
          </div>

          <Button
            className={
              "w-full !bg-white border border-primary-color !text-primary-color"
            }
            value={"Login"}
            onClick={() => this.navigateTo(PageRoutePath.LOGIN)}
          />
        </div>
      </div>
    );
  }
}

export default HOC(Register);
