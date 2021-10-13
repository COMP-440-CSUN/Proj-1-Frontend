async function Post(url, body)
{
  const returnData = await fetch(url, 
  {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      Accept: "application/json",
      authorization: sessionStorage.getItem("auth") ? "Bearer " + sessionStorage.getItem('token') : ""
    },
    body: JSON.stringify(body)
  })
  return await returnData.json()
}

async function Get(url)
{
  const returnData = await fetch(url, 
  {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      Accept: "application/json",
      authorization: sessionStorage.getItem("auth") ? "Bearer " + sessionStorage.getItem('token') : ""
    }
  })
  return await returnData.json();
}

export {Post, Get}