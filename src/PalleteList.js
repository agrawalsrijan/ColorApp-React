import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MiniPallete from "./MiniPallete";

class PalleteList extends Component{

  render(){
    const {palletes} = this.props;
    return(

      <div>
        <MiniPallete/>
        <h1>React Colors!</h1>
        {palletes.map(pallete=>(
          <p>
            <Link to={`/pallete/${pallete.id}`}>
              {pallete.paletteName}
            </Link>
          </p>


        ))}
      </div>
    )
  }
}
export default PalleteList;
