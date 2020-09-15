
/* Pagination Based on Search */


import * as React from "react";
import { TableRow } from "./TableRow"

class OpenHouseSearch extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchStr: "",
            classesData: [],
            filtertedData: [],
            pageCount: 0,
            perPage: 3,
            offset: 0,
        }
    }


    handlePageClick = (index: number) => {
        const { perPage, classesData } = this.state
        const selectedPage = index;
        const offset = selectedPage - 1 * 10;

        // this.setState((prevsState: any) => ({
        //     ...prevsState,
        //     filtertedData: "sss"
        // }))

        // this.setState({ filtertedData: [...this.state.filtertedData, ]})

        this.setState({
            currentPage: index,
            offset: offset
        }, () => {
            const slicedData = classesData && classesData.slice(this.state.offset, this.state.offset + perPage)
            this.setState({ filtertedData: slicedData })
        });
    };

    fetchData = () => {
        const {offset, perPage, classesData, filtertedData } = this.state
        const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD65TNXHpGCH9EiGY6g9_yDahQXT9JfISQ&cx=018264299595958242005:dvs2adlrsca&q=${this.state.searchStr}`
        fetch(url)
            .then(respose => respose.json())
            .then(dataRes => {
                const data = dataRes.items;
                const slice = data && data.slice(this.state.offset, this.state.offset + this.state.perPage);
                this.setState({ classesData: data,  pageCount: Math.ceil(data.length / perPage), filtertedData: slice, currentPage: 1 });
            })
            .catch((e: Error) => console.log("Error", e))
    }

    updatedStr = (event: any) => {
        this.setState({searchStr: event.target.value }, () => this.fetchData())
    }

    render(): React.ReactNode {
      const { searchStr, classesData, filtertedData, pageCount, offset, currentPage } = this.state;
      return (
        <div>
            <input type="text" onChange={this.updatedStr} value={searchStr}/>
            {( filtertedData && filtertedData.map((stableRo: any) => <TableRow data={stableRo}/> ))}

            <div className="tableView">
               {[...Array(pageCount)].map((x, i) =>
                   <div className={currentPage === i+1 ? `paginateView activePaginate` : "paginateView"} onClick={() => this.handlePageClick(i + 1)}> {i + 1} </div>
               )}
           </div>
        </div>
        );
    }
}

export default OpenHouseSearch





