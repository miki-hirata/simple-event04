//共通処理
async function request(path, options = {}) {
  const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
  const response = await fetch(url, options);
  return response.json();
}

//各パスへGETリクエストを行う関数
export async function getEvents(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/events?${params.toString()}`);
}

export async function getEvent(eventId) {
  return request(`/event?id=${eventId}`);
}

export async function getPlaces(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/places?${params.toString()}`);
}

export async function getPlace(placeId) {
  return request(`/place?id=${placeId}`);
}

export async function addPlace() {
  return request(`/place/add`, {
    method: "POST",
  });
}