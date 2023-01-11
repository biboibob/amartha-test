import React, { Component } from "react";
import Swal from "sweetalert2";

/* HOC */
import HOC from "..//HOC/mainHOC";

// EndPoint
import { getDetailAnime } from "../helper/api";

// Service
import { PageRoutePath } from "../utils/config";

export class DetailAnime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animeDetail: {},
      idAnime: null,
    };
  }

  componentDidMount() {
    const { params } = this.props;
    this.setState(
      {
        idAnime: params.id,
      },
      () => {
        this.getData();
      }
    );
  }

  navigateTo = (Route) => {
    const { navigate } = this.props;
    navigate(Route);
  };

  getData = () => {
    const requestBody = {
      id: parseInt(this.state.idAnime),
    };
    getDetailAnime(requestBody).then((res) => {
      const data = res.data;

      if (res.data.status === 404) {
        Swal.fire({
          title: "Whoops! Something Happend.",
          text: `${data.message}. You'll be redirecting to Home`,
          icon: "warning",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            this.navigateTo(PageRoutePath.Home);
          }
        });
      } else {
        this.setState({
          animeDetail: data.data,
        });
      }
    });
  };

  render() {
    const animeDetail = this.state.animeDetail;
   
    return (
      <div className="flex py-3">
        <div className="flex justify-center basis-1/2">
            <img src={animeDetail.images?.jpg.large_image_url} className="rounded-xl w-auto h-5/6 object-cover"/>
        </div>
        <div className="flex flex-col basis-1/2">
            <span className="text-xl font-bold">{animeDetail.title_english}</span>
        </div>
      </div>
    );
  }
}

export default HOC(DetailAnime);
