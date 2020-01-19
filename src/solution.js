import React from 'react';
import { useAsync } from 'react-async';
import some from 'lodash/some';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import { apis } from './defaults';

const DEFAULT_YEAR = '2018';
const BELONGS_TO = 'NASA';

const fetchData = async () => {
  return await fetch(`${apis.proxy}/${apis.launches}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());
}

const prepareData = (data) => {
  // a list of all the missions that were launched in ${DEFAULT_YEAR} that carried a payload that belonged to ${BELONGS_TO}
  const result = data
    .filter(({ launch_year, rocket: { second_stage } }) => {
      if (launch_year === DEFAULT_YEAR) {
        const { payloads } = second_stage;
        return some(payloads, ({ customers }) => find(customers, c => c.includes(`${BELONGS_TO}`)));
      }
      return false;
    })
    .map(({ flight_number, mission_name, rocket: { second_stage } }) => {
      return {
        flight_number,
        mission_name,
        payloads_count: second_stage.payloads.length
      };
    });

  // sort in inverse chronological order with the exception that those that carried more payloads that should appear first
  return sortBy(result, ['payloads_count']).reverse();
}

const renderData = (data) => {
  const formatted = JSON.stringify(data, null, 2);
  document.getElementById("out").innerHTML = formatted;
}

module.exports = {
  prepareData: prepareData,
  renderData: renderData,
  fetchData: fetchData
};
