import { Redirect } from "react-router-dom";

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
  return request(`/events?id=${eventId}`);
}

export async function getPlaces(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/places?${params.toString()}`);
}

export async function getPlace(placeId) {
  return request(`/places?id=${placeId}`);
}

//POSTリクエストをまとめる　typeに文字列で挿入する
//リダイレクト処理が上手くいっていない
async function postPlace(place, type){
  return request(`/places/${type}`, {
    body: JSON.stringify(place),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then(()=>{
    return <Redirect to="/places" />
  });
}

export async function handleAddPlace(content) {
  const place = {
    "name": content.target.elements.name.value,
    "memo": content.target.elements.memo.value
  };
  await postPlace(place, 'add').then(()=>{
    return <Redirect to="/places" />
  });
}

export async function handleEditPlace(content) {
  const place = {
    "id": content.target.elements.id.value,
    "name": content.target.elements.name.value,
    "memo": content.target.elements.memo.value
  };
  await postPlace(place, 'edit');
}

export async function handleDeletePlace(content) {
  const place = {
    "id": content.target.elements.id.value,
  };
  await postPlace(place, 'delete');
}