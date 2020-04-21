import React, { useState } from "react";
import "./styles.css";

function Publish() {
  const selectedTags = tags => {
		console.log(tags);
  };
  
  return (
    <div className="relative max-w-7xl mx-auto mt-15">
      <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Remember Card
            </h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              The people you will remember forever.
            </p>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-4">
                  <label
                    for="name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    for="born"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Born
                  </label>
                  <input
                    type="date"
                    name="born"
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    for="dead"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Dead
                  </label>
                  <input
                    type="date"
                    name="dead"
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div className="col-span-4">
                  <label
                    for="name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Tags
                  </label>
                  <TagsInput selectedTags={selectedTags}  tags={['covid19']}/>
                </div>

                <div className="col-span-6">
                  <label
                    for="memo"
                    className="block text-sm leading-5 font-medium text-gray-700"
                  >
                    Memo
                  </label>
                  <div className="rounded-md shadow-sm">
                    <textarea
                      id="memo"
                      rows="3"
                      className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="He never grew up, but he never stopped growing."
                    ></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for the people you will remember forever.
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 text-right sm:px-6">
                <button type="button" className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const TagsInput = (props) => {
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="flex flex-wrap mt-1 form-input py-2 px-3 w-full block inline-block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
      <ul className="flex flex-wrap">
        {tags.map((tag, index) => (
          <li key={index} className="mr-2 my-1 inline-block w-auto rounded-md font-medium text-white bg-indigo-600 ">
            <span className="mx-2">{tag}</span>
            <span className="text-white cursor-pointer rounded-full mr-2" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
        className="flex-auto mx-auto my-1 focus:outline-none"
      />
    </div>
  );
};

export default Publish;
