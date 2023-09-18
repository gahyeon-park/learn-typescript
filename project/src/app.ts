// 라이브러리 로딩
// import 변수명 from '라이브러리 이름';
import axios, { AxiosResponse } from 'axios';
import Chart from 'chart.js/auto';
// import * as Chart from 'chart.js';
import {
  ICovidSummary,
  ICountry,
  TCountrySummaryResponse,
  ICountryInfo,
} from './covid';

// utils
function $(selector: string) {
  return document.querySelector(selector);
}
function getUnixTimestamp(date: string | Date) {
  return new Date(date).getTime();
}

// DOM
// let el: Element | HTMLElement | HTMLParagraphElement;
const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;
const deathsTotal = $('.deaths') as HTMLParagraphElement;
const recoveredTotal = $('.recovered') as HTMLParagraphElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement;
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center',
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;

// api
function fetchCovidSummary(): Promise<AxiosResponse<ICovidSummary>> {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

// fetchCovidSummary().then(res => res.data.)

enum CovidStatus {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths',
}

function fetchCountryInfo(
  countryName: string | undefined,
  status: CovidStatus,
): Promise<AxiosResponse<TCountrySummaryResponse>> {
  // params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  if (!rankList) return;
  rankList.addEventListener('click', handleListClick);
}

// var evt = Event | UIEvent | MouseEvent;
async function handleListClick(event: Event) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement
      ? event.target.parentElement.id
      : undefined;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Deaths,
  );
  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Recovered,
  );
  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Confirmed,
  );
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data: TCountrySummaryResponse) {
  const sorted = data.sort(
    (a: ICountryInfo, b: ICountryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach((value: ICountryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList!.appendChild(li);
  });
}

function clearDeathList() {
  deathsList.innerHTML = null;
}

function setTotalDeathsByCountry(data: TCountrySummaryResponse) {
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: TCountrySummaryResponse) {
  const sorted = data.sort(
    (a: ICountryInfo, b: ICountryInfo) =>
      getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach((value: ICountryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = null;
}

function setTotalRecoveredByCountry(data: TCountrySummaryResponse) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]) {
  const lineChart = $('#lineChart') as HTMLCanvasElement;
  // const ctx = ($('#lineChart') as HTMLCanvasElement).getContext('2d');
  const ctx = lineChart.getContext('2d');
  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: TCountrySummaryResponse) {
  const chartData = data.slice(-14).map((value: ICountryInfo) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: ICountryInfo) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1),
    );
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: ICovidSummary): void {
  confirmedTotal.innerText = data.Countries.reduce(
    (total: number, current: ICountry) => (total += current.TotalConfirmed),
    0,
  ).toString();
}

function setTotalDeathsByWorld(data: ICovidSummary): void {
  deathsTotal.innerText = data.Countries.reduce(
    (total: number, current: ICountry) => (total += current.TotalDeaths),
    0,
  ).toString();
}

function setTotalRecoveredByWorld(data: ICovidSummary): void {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: number, current: ICountry) => (total += current.TotalRecovered),
    0,
  ).toString();
}

function setCountryRanksByConfirmedCases(data: ICovidSummary) {
  const sorted = data.Countries.sort(
    (a: ICountry, b: ICountry) => b.TotalConfirmed - a.TotalConfirmed,
  );
  sorted.forEach((value: ICountry) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: ICovidSummary) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
