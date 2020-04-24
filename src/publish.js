import React, { useState, Fragment } from "react";
import axios from "axios";
import "./styles.css";

function Publish() {
  const name = useFormInput("李文亮");
  const born = useFormInput();
  const died = useFormInput();
  const memo = useFormInput();
  const [tags, setTags] = useState(["covid19"]);
  const selectedTags = (tags) => {
    setTags(tags);
  };

  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    console.log(name, " ", born, " ", died, " ", tags, " ", memo);
    e.preventDefault();
    const record = {
      base_req: {
        from: "cosmos1lxmp6c3229lqy8xuv6tfzjd8fwd8q8yqp443hh",
        memo: "Sent via higan 🚀",
        chain_id: "higan-test",
      },
      name: name.value,
      born: born.value,
      died: died.value,
      memo: memo.value,
      tag: tags,
      recorder: "cosmos1lxmp6c3229lqy8xuv6tfzjd8fwd8q8yqp443hh",
    };
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/tombstone/record`,
        record
      );
      console.log(response.data);
    } catch (error) {
      setIsError(true);
    }
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
            <form onSubmit={handleSubmit} method="POST">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-4">
                  <label
                    for="name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    {...name}
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
                    {...born}
                    type="date"
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    for="died"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    died
                  </label>
                  <input
                    {...died}
                    type="date"
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
                  <TagsInput selectedTags={selectedTags} tags={["covid19"]} />
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
                      {...memo}
                      name="memo"
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
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
                >
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
          <li
            key={index}
            className="mr-2 my-1 inline-block w-auto rounded-md font-medium text-white bg-indigo-600 "
          >
            <span className="mx-2">{tag}</span>
            <span
              className="text-white cursor-pointer rounded-full mr-2"
              onClick={() => removeTags(index)}
            >
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

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}
export default Publish;
