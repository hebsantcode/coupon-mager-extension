chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "checkUpdates") {
    fetch("https://api-coupon-manager.vercel.app/coupons/fetch-members/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse(data);
      })
      .catch((error) => {
        console.error("fetch error:", error);
        sendResponse({ error: "An error ocurred" });
      });
    // Return true to indicate the request is asynchronous
    return true;
  } else if (message.type === "fetchMembers") {
    fetch("https://api-coupon-manager.vercel.app/coupons/fetch-members/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const totalMembers = data.total_members;
        if(totalMembers != 0){
          const halfMembers = Math.round(totalMembers / 1.45);
          const data = { totalMembers: totalMembers, halfMembers: halfMembers };
          sendResponse(data);
          pagination(0, 100, 0, totalMembers)
        }
      })
      .catch((error) => {
        console.error("fetch error:", error);
        sendResponse({ error: "An error ocurred" });
      });
    // Return true to indicate the request is asynchronous
    return true;
  }
});

async function pagination(offset, count, membersFetched, totalMembers) {
  const data = await fetch(
    "https://api-coupon-manager.vercel.app/coupons/pagination/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offset: offset,
        count: count,
        members_fetched: membersFetched,
      }),
    }
  );
  let res = await data.json();
  console.log(membersFetched);
  if (res.offset < totalMembers) {
    pagination(res.offset, count, res.members_fetched, totalMembers);
  } else {
    console.log("Fetch is complete");
  }
}