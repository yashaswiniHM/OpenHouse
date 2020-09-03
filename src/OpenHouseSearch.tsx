
import * as React from "react";
import { TableRow } from "./TableRow"

class OpenHouseSearch extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchStr: "",
            classesData: [],
            filtertedData: [],
            pageCount: 0
        }
    }

    handlePageClick = (e: any) => {
        const { perPage, classesData } = this.state
        const selectedPage = e.selected;
        const offset = selectedPage * 10;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            const slice = classesData.slice(this.state.offset, this.state.offset + 10)
            this.setState({ filtertedData: slice })
        });
    };

    fetchData = () => {
        const {offset, perPage, classesData, filtertedData } = this.state
        const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD65TNXHpGCH9EiGY6g9_yDahQXT9JfISQ&cx=018264299595958242005:dvs2adlrsca&q=${this.state.searchStr}`
        fetch(url)
            .then(respose => respose.json())
            .then(data => {
                const slice = data && data.items && data.items.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({ classesData: data.items,  pageCount: Math.ceil(data.length / 10), filtertedData: slice })
            })
            .catch((e: Error) => console.log("Error", e))
    }

    updatedStr = (event: any) => {
        this.setState({searchStr: event.target.value }, () => this.fetchData())
    }

    render(): React.ReactNode {
      const {searchStr, classesData, filtertedData} = this.state;
      return (
        <div>
            <input type="text" onChange={this.updatedStr} value={searchStr}/>
            {(filtertedData && filtertedData.map((stableRo: any) => <TableRow data={stableRo}/> ))}
        </div>
        );
    }
}

export default OpenHouseSearch