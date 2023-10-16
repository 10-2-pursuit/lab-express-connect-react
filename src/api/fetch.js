const URL = import.meta.env.VITE_BASE_URL;

// Index/Get all
export async function getAllLogs() {
  return await fetch(`${URL}/logs`).then((res) => {
    console.log(res);
    return res.json();
  });
}

// index/Get one
export async function getOneLog(id) {
  return await fetch(`${URL}/logs/${id}`).then((res) => res.json());
}

// Create
export async function createLog(log) {
  return await fetch(`${URL}/logs/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(log),
  });
}

// Update
export async function updateLog(id, log) {
  return await fetch(`${URL}/logs/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(log),
  });
}

// Delete
export async function destroyLog(id) {
  return await fetch(`${URL}/logs/${id}`, {
    method: "DELETE",
  });
}
