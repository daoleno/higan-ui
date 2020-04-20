import React from "react";
import "./styles.css";

function Publish() {
  return (
    <div className="relative max-w-7xl mx-auto">
      <div class="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Remember Card
            </h3>
            <p class="mt-1 text-sm leading-5 text-gray-500">
              The people you will remember forever.
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="name"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>



                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="born" 
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Born
                  </label>
                  <input
                    type="date" name="trip-start" value="2018-07-22" min="1994-01-01" max="2018-12-31"
                    id="born"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="dead"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Dead
                  </label>
                  <input
                    id="dead"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div class="col-span-6 ">
                  <label
                    for="memo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                  >
                    Memo
                  </label>
                  <div class="rounded-md shadow-sm">
                    <textarea
                      id="memo"
                      rows="3"
                      class="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="He never grew up, but he never stopped growing."
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Brief description for the people you will remember forever.
                  </p>
                </div>
              </div>
              <div class="px-4 py-3 text-right sm:px-6">
                <button class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
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

export default Publish;
