import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function Record() {
  const [data, setData] = useState({ height: "", result: [] });
  const [url, setUrl] = useState(
    "http://127.0.0.1:8080/tombstone/records"
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios(url);
        
        
        setData(response.data);
        setIsLoading(false);
        console.log(response.data)

      } catch (error) {
      }
    };
    fetchData();
  }, [url]);


  return (
    <Fragment>
      {isLoading ? (
        <img className="m-10 h-10"  src="loading.svg" alt="loading..."/>
      ) : (
        data.result.map(records => (
          records.records.map(record => (
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="mt-3 text-base leading-6 text-gray-500">
            {record.memo}
          </p>
        </div>
  
        <div className="mt-6 flex items-center">
          <div>
            <p className="text-sm leading-5 font-medium text-gray-900">
              <a href="#" className="hover:underline">
                {record.name}
              </a>
            </p>
            <div className="flex text-sm leading-5 text-gray-500">
              <time dateTime="2011-11-18T14:54:39.929Z">
                {record.born}
              </time>
              <span className="mx-1">
                &ndash;
              </span>
              <time dateTime="2020-03-16">
                Mar 16, 2020
                {record.dead}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
     ))
        ))

    )}
    </Fragment>

    
    
  
  );
}

export default Record;
