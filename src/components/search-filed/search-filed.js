import React from 'react';
import { Button } from 'react-bootstrap'
import './search-filed.css'

let inputData = '';

const SearchField = ({getOrgName}) => {


    const getInputData = (e) => {
        inputData = e.target.value;
    };

   const propData = () => {
       return getOrgName(inputData)
   }

        return (
            <div className="container-block container">

                <div>
                    <input
                        className="form-control"
                        type="text"
                        onChange={getInputData}
                        placeholder="Enter organization name"/>

                </div>
                <Button onClick={propData}>Search</Button>
            </div>

        );
}

export default SearchField;

