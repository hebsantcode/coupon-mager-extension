// Create a coupon
document.querySelector("#createForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const couponDescription = document.querySelector("#couponDescription").value;
  const couponCode = document.querySelector("#couponCode").value;
  const couponDiscount = document.querySelector("#couponDiscount").value;

  console.log(couponCode, couponDescription, couponDiscount);

  await fetch("https://api-coupon-manager.vercel.app/coupons/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: couponDescription,
      discount: couponDiscount,
      code: couponCode,
    }),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res.is_created);
      if (res.is_created) {
        var toastsContainer = document.querySelector(".toasts");
        toastsContainer.innerHTML = "";
        var toast = `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11" bis_skin_checked="1">
          <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"
            bis_skin_checked="1">
            <div class="toast-header" bis_skin_checked="1">
                <img src="icons/icon_100.png" alt="" class="me-2" height="18">
                <strong class="me-auto">DSF Manager</strong>
                <small class="text-muted">1 second ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" bis_skin_checked="1">
                The coupon ${res.coupon_code} was successfully created.
            </div>
        </div>
      </div>`;
        toastsContainer.innerHTML = toast;
      } else {
        var toastsContainer = document.querySelector(".toasts");
        toastsContainer.innerHTML = "";
        var toast = `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11" bis_skin_checked="1">
          <div id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true"
            bis_skin_checked="1">
            <div class="toast-header" bis_skin_checked="1">
                <img src="icons/icon_100.png" alt="" class="me-2" height="18">
                <strong class="me-auto">DSF Manager</strong>
                <small class="text-muted">1 second ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" bis_skin_checked="1">
                The coupon ${res.coupon_code} already exists.
            </div>
        </div>
      </div>`;
      toastsContainer.innerHTML = toast;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
