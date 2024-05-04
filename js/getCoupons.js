document.addEventListener("DOMContentLoaded", () => {
  fetchCoupons();
});

async function fetchCoupons() {
  const initialTime = performance.now();
  const data = await fetch(
    "https://api-coupon-manager.vercel.app/coupons/all/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await data.json();
  const endTime = performance.now();
  const timeRequest = Math.round((endTime - initialTime) * 5);
  document.querySelector(".coupons").innerHTML = showPreload();
  setTimeout(() => {
    hidePreload();
    createCouponCard(res);
  }, timeRequest);
}

function showPreload() {
  const preload = `
    <div class="col-lg-12 text-center" id="preloadFetching">
        <div class="spinner-grow text-primary m-1" role="status"></div>
        <p>Loading coupons</p>
    </div>`;
  return preload;
}

function hidePreload() {
  document.querySelector("#preloadFetching").remove();
}

function createCouponCard(response) {
  var couponsContainer = document.querySelector(".coupons");
  console.log(response.coupons.length);
  if (response.coupons.length > 0) {
    couponsContainer.innerHTML = "";
    for (coupon of response.coupons) {
      var couponCard = `
        <div class="col-lg-4">
            <div class="card bg-primary border-primary text-white-50">
                <div class="card-body">
                    <h5 class="mb-3 text-white" style=" display: inline-flex; align-items: center; width: 100%; justify-content: space-between;">
                        ${coupon.code}
                        <i class="bx bxs-coupon ms-2 text-white font-size-16 align-middle me-1"></i>
                        <div class="btn" style=" width: 100%; justify-content: end; display: flex;">
                            <button data-id="${coupon.id}" type="button" class="btn btn-dark waves-effect waves-light delete-coupon">
                                <i data-id="${coupon.id}" class="mdi mdi-delete font-size-16 align-middle me-2"
                                    style="margin: auto!important;"></i>
                            </button>
                        </div>
                    </h5>
                    <h5 class="card-title text-white mb-3">Discount: ${coupon.discount}%</h5>
                    <p class="card-text text-white">
                        ${coupon.description}
                    </p>
                </div>
            </div>
        </div>
      `;
      couponsContainer.innerHTML += couponCard;
      deleteCoupon();
    }
  } else {
    couponsContainer.innerHTML = "";
    couponsContainer.innerHTML =
      "<span class='text-center'>Not coupons yet</span>";
  }
}

async function deleteCoupon() {
  const allBtnDeletes = document.querySelectorAll(".delete-coupon");
  for (btn of allBtnDeletes) {
    btn.addEventListener("click", async (e) => {
      var couponId = e.target.dataset.id;
      const data = await fetch(
        "https://api-coupon-manager.vercel.app/coupons/delete/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            couponId,
          }),
        }
      );
      const res = await data.json();
      if (res.is_deleted) {
        fetchCoupons();
      }
    });
  }
}
