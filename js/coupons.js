// Create a coupon
document.querySelector("#createForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const couponDescription = document.querySelector("#couponDescription").value;
  const couponCode = document.querySelector("#couponCode").value;
  const couponDiscount = document.querySelector("#couponDiscount").value;

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
        closeToast()
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
        closeToast()
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

document.querySelector("#applyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#emailApply").value;
  const code = document.querySelector("#couponApply").value;
  console.log(email, code)
  const data = await fetch(
    "https://api-coupon-manager.vercel.app/coupons/apply/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        email,
      }),
    }
  );
  const res = await data.json();
  if (res.error) {
    var toastsContainer = document.querySelector(".toasts");
    toastsContainer.innerHTML = "";
    var modal = `
    <button id="btnModal" type="button" class="btn d-none btn-primary waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Static backdrop modal
    </button>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">An error ocurred</h5>
                </div>
                <div class="modal-body">
                    <p>This error is solved by reloading the extension, we will reload it for you.</p>
                </div>
                <div class="modal-footer">
                    <button id="btnOk" type="button" class="btn btn-primary">Ok</button>
                </div>
            </div>
        </div>
    </div>`;
    toastsContainer.innerHTML = modal;
    document.querySelector("#btnModal").click();
    document.querySelector("#btnOk").addEventListener("click", () => {
      localStorage.clear();
      document.location.href = "loading.html";
    });
  } else if (res.is_valid) {
    console.log('Aplicando cupón')
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
            Coupon ${res.coupon_code} successfully applied.
          </div>
      </div>
    </div>`;
    toastsContainer.innerHTML = toast;
    closeToast()
  } else if (res.coupon_error) {
    console.log('Cupón no existe')
    console.log(res);
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
            ${res.coupon_error}
          </div>
      </div>
    </div>`;
    toastsContainer.innerHTML = toast;
    closeToast()
  } else {
    console.log('Cupon ya aplicado')
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
            The email ${res.email} has already used the coupon.
          </div>
      </div>
    </div>`;
    toastsContainer.innerHTML = toast;
    closeToast()
  }
});

function closeToast(){
  const btn = document.querySelector('.btn-close')
  setTimeout(() => {
    btn.click()
  }, 3500)
}
