import React, { Component } from "react";
import axios from "axios";

const loadingCSS = {
    height: "100px",
    margin: "30px"
  };

class ScrollComponent extends Component<any, any> {
    // private loadingRef: React.RefObject<HTMLInputElement>;
    private loadingRef: any
    private observer: any
    constructor(props: any) {
        super(props);
        this.loadingRef = React.createRef()
        this.state = {
            photos: [],
            loading: false,
            page: 0,
            prevY: 0
        };
    }

    componentDidMount() {
        this.getPhotos(this.state.page)

        const options = {
            // root: document.querySelector('#divRoot'), /* or `null` for page as root */
            root: null,
            rootMargin: "0px",
            threshold: 1.0
          };
          
           this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
          );

          this.observer.observe(this.loadingRef);
    }

    componentWillUnmount () {
        this.observer.disconnect();
    }

    handleObserver(entities: any, observer: any) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastPhoto = this.state.photos[this.state.photos.length - 1];
            const curPage = lastPhoto.albumId;
            this.getPhotos(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    getPhotos = (page: number) => {
        this.setState({ loading: true });
        axios
          .get(
            `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
          )
          .then((res: any) => {
            this.setState({ photos: [...this.state.photos, ...res.data] });
            this.setState({ loading: false });
          });
      }

    render() {
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <div className="container">
                <div style={{ minHeight: "800px" }}>
                    {this.state.photos.map((user: any) => (
                        <img src={user.url} height="100px" width="200px" />
                    ))}
                    </div>
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef!)}
                    style={loadingCSS}
                    >
                    <span style={loadingTextCSS}>Loading...</span>
                    </div>
            </div>
        );
    }
}

export default ScrollComponent;