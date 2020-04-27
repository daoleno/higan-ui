import {
  BROADCAST_MODE_BLOCK,
  createBroadcastTx,
  createWalletFromMnemonic,
  signTx,
  verifyTx,
} from "@tendermint/sig";
import axios from "axios";
import React, { useState, Fragment } from "react";
import { config } from "./config.js";
import "./styles.css";

function Publish() {
  const name = useFormInput("");
  const born = useFormInput("");
  const died = useFormInput("");
  const memo = useFormInput();
  const [tags, setTags] = useState(["covid19"]);
  const selectedTags = (tags) => {
    setTags(tags);
  };

  const [isError, setIsError] = useState(false);
  const [isSubmit, seIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = {
      base_req: {
        from: config.recorder,
        memo: "Sent via higan 🚀",
        chain_id: config.chainId,
      },
      name: name.value,
      born: new Date(born.value).toJSON(),
      died: new Date(died.value).toJSON(),
      memo: memo.value,
      tag: tags,
      recorder: config.recorder,
    };
    try {
      const response = await axios.post(
        config.lcdUrl + "/tombstone/record",
        record
      );

      // Sign stdTx
      let stdTx = response.data.value;
      const wallet = createWalletFromMnemonic(config.mnemonic); // BIP39 mnemonic string
      // Get account
      const accRes = await axios.get(
        config.lcdUrl + "/auth/accounts/" + record.recorder
      );
      const acc = accRes.data.result.value;
      const signMeta = {
        account_number: acc.account_number.toString(),
        chain_id: config.chainId,
        sequence: acc.sequence.toString(),
      };
      // Ensure signTx can verify signatures.
      stdTx.signatures = [];
      const signedStdTx = signTx(stdTx, signMeta, wallet);
      const valid = verifyTx(signedStdTx, signMeta);
      if (!valid) {
        throw new Error("Signatures is not valid.");
      }

      // Broadcast tx
      const broadcastTx = createBroadcastTx(signedStdTx, BROADCAST_MODE_BLOCK);
      const res = await axios.post(config.lcdUrl + "/txs", broadcastTx);
      if (res.data.code !== undefined) {
        throw new Error(res.data.raw_log);
      }

      seIsSubmit(true);
    } catch (error) {
      setIsError(true);
      setErrMsg(error.toString());
    }
  };

  return (
    <Fragment>
      {isError ? (
        <div className="relative max-w-7xl mx-auto mt-15">
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm leading-5 font-medium text-red-800">
                  There were errors with your submission
                </h3>
                <div class="mt-2 text-sm leading-5 text-red-700">
                  <ul class="list-disc pl-5">
                    <li>{errMsg}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isSubmit ? (
        <div className="relative max-w-7xl mx-auto mt-15">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 font-medium text-green-800">
                  Successfully published
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:bg-green-100 transition ease-in-out duration-150">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
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
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-4">
                    <label className="block text-sm font-medium leading-5 text-gray-700">
                      Name
                    </label>
                    <input
                      {...name}
                      className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-sm font-medium leading-5 text-gray-700">
                      Born
                    </label>
                    <input
                      {...born}
                      type="date"
                      className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-sm font-medium leading-5 text-gray-700">
                      Died
                    </label>
                    <input
                      {...died}
                      type="date"
                      className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="block text-sm font-medium leading-5 text-gray-700">
                      Tags
                    </label>
                    <TagsInput selectedTags={selectedTags} tags={["covid19"]} />
                  </div>

                  <div className="col-span-6">
                    <label className="block text-sm leading-5 font-medium text-gray-700">
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
                      Brief description for the people you will remember
                      forever.
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
    </Fragment>
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
        onKeyPress={(e) => {
          e.which === 13 && e.preventDefault();
        }}
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
