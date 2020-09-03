import * as React from "react";


export const TableRow:React.FC<any> = (props) => {
    const { data, pageCount, onPageChange, pageRange } = props
    return (
       <div className="tableView">
           {/*<img src={`https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTWYTzQ_w2gRDGPuX4WZ63FXy9UUFt79cLAVRwppUk7hAFuh6STBQVK250`} />*/}
           <img src={`${props?.data?.pagemap?.cse_thumbnail?.[0].src}`}
                height={`${props?.data?.pagemap?.cse_thumbnail?.[0].height}`}
                width={`${props?.data?.pagemap?.cse_thumbnail?.[0].width}`} />
           <div> {props?.data?.link} </div>

           <div>
               {[...Array(pageCount)].map((x, i) =>
                   <div style={{ width: 10, height: 10, backgroundColor: "white", border: "1px solid"}}> {i} </div>
               )}
           </div>
       </div>
    )
}

