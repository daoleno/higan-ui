import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { config } from "./config.js";
import "./styles.css";

const unknownAddress = "0001-01-01T00:00:00Z";

function Card() {
  const [data, setData] = useState({ height: "", result: [] });
  const url = config.lcdUrl + "/tombstone/records";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      {isLoading || !data.result ? (
        <img className="m-10 h-10" src="loading.svg" alt="loading..." />
      ) : (
        data.result.map((records) =>
          records.records.map((record) => (
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
                      <span>
                        {record.born === unknownAddress
                          ? "?"
                          : new Intl.DateTimeFormat("en-US").format(
                              new Date(record.born)
                            )}
                      </span>
                      <span className="mx-1">&ndash;</span>
                      <span>
                        {record.died === unknownAddress
                          ? "?"
                          : new Intl.DateTimeFormat("en-US").format(
                              new Date(record.died)
                            )}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {record.tags.map((tag, index) => (
                    <span className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-md text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )
      )}
    </Fragment>
  );
}

export default Card;
