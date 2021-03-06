import store from './store';

async function api_get(path) {
  let text = await fetch(
    "http://events-spa.jehaneali.site/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://events-spa.jehaneali.site/api/v1" + path, opts);
  return await text.json();
}

export function fetch_users() {
  api_get("/users").then((data) => {
    let action = {
      type: 'users/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_events() {
  api_get("/events").then((data) => {
    let action = {
      type: 'events/set',
      data: data,
    }
    store.dispatch(action);
  });
}

// export function api_login(name, password) {
//   api_post("/session", {name, password}).then((data) => {
//     console.log("login resp", data);
//     let action = {
//       type: 'session/set',
//       data: data,
//     }
//     store.dispatch(action);
//   });
// }

export function api_login(name, password) {
    api_post("/session", {name, password}).then((data) => {
      console.log("login resp", data);
      if (data.session) {
        let action = {
          type: 'session/set',
          data: data.session,
        }
        store.dispatch(action);
      }
      else if (data.error) {
       let action = {
          type: 'error/set',
          data: data.error,
        }
        store.dispatch(action);
      }
    });
  }

export function load_defaults() {
  fetch_users();
  fetch_events();
  
}