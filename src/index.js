// Please run your solution from this file

console.log("Hello from %csrc/index.js", "font-weight:bold");
import React from 'react';
import { useAsync } from 'react-async';
import { render } from 'react-dom';
import { renderData, prepareData, fetchData } from './solution';

const App = () => {
    const { data = [], isLoading } = useAsync({ promiseFn: fetchData });
    return (
        <>
            {
                isLoading ? (
                    <h5>Loading...</h5>
                ) : (
                        <>{renderData(prepareData(data))}</>
                    )
            }
        </>
    );
}
render(<App />, document.getElementById('root'));