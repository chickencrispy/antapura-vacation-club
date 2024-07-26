// SET INPUT MAX DAY TODAY FOR HISTORY
// Input date set default value today, and max date set today & show picker on focus
const dateToday = new Date().toISOString().split("T")[0];

const initializeDateInput = (selector, dateAttr) => {
  document.querySelectorAll(selector).forEach(input => {
    //input.value = dateToday;
    input[dateAttr] = dateToday;

    input.addEventListener("focus", () => {
      input.showPicker();
    });

    input.addEventListener("change", function() {
      if(input.value != ""){
        this.setAttribute("data-date", moment(this.value).format("DD MMM YYYY"));
      }
    });

    const event = new Event('change');
    input.dispatchEvent(event);
  });
};

initializeDateInput(".input-date-icon .max-today", "max");
initializeDateInput(".input-date-icon .min-today", "min");

// AUTO SHOW PICKER ON INPUT DATE
document.querySelectorAll("input[type='date']").forEach(input => {
  input.addEventListener("click", () => {
    input.showPicker();
  });

  input.addEventListener("change", function() {
    this.setAttribute("data-date", moment(this.value).format("DD MMM YYYY"));
  });

  const event = new Event('change');
});

// DROPDOWN MENU FUNCTION
// Display selection item name on input/button dropdown
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
dropdownMenu.forEach(dropdown => {
  dropdown.querySelectorAll(".form-check-input").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const checkeds = dropdown.querySelectorAll(".form-check-input:checked");
      const dropdBtn = dropdown.previousElementSibling;
      var checkLen = checkeds.length;
      if(checkLen == 1) {
        dropdBtn.textContent = checkeds[0].nextElementSibling.textContent;
      }else if(checkLen == 2) {
        dropdBtn.textContent = checkeds[0].nextElementSibling.textContent + ", " + checkeds[1].nextElementSibling.textContent;
      }else if(checkLen > 2) {
        dropdBtn.textContent = checkeds[0].nextElementSibling.textContent + ", " + checkeds[1].nextElementSibling.textContent  + ", & " + (checkLen-2) + " more";
      }
    });
  });
});

// FILTER PERIOD ON TRANSACTION HISTORY
// Show input date for select period of transaction history
const filterPeriod = document.querySelectorAll('input[name="filter-period"]');
filterPeriod.forEach(periods => {
  periods.addEventListener("change", function() {
    document.getElementById("fth-period").classList.toggle("d-none", this.value != "custom");
  });
});

// FORMAT INPUT CURRENCY
document.querySelectorAll('[inputmode=numeric]').forEach(input => {
  input.addEventListener('input', formatCurrency);
});

function formatCurrency(event) {
  let value = this.value.replace(/[^\d]/g, "");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  this.value = value;
}

// CUSTOM PERIOD
const customPeriod = document.getElementById("custom-period");
if(customPeriod){
  const customPeriodSelect = customPeriod.querySelector("select");

  function toggleCustomPeriod() {
    customPeriodSelect.parentNode.classList.toggle("d-none");
    customPeriodSelect.parentNode.nextElementSibling.classList.toggle("d-none");
  }
  
  customPeriodSelect.addEventListener("change", () => {
    const child = customPeriodSelect.children.length;
    if(customPeriodSelect.children[child-1].selected) {
      toggleCustomPeriod();
    }
  });
}

// ADMIN PAGE MENU
const toggleElementClass = (elementId, className) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle(className);
  }
  return element && element.classList.contains(className);
};

const showNavbar = (toggleIds, navId) => {
  const sidebar = document.getElementById(navId);
  
  if (sidebar) {
    toggleIds.forEach(toggleId => {
      const toggle = document.getElementById(toggleId);
      if (toggle) {
        toggle.addEventListener('click', () => {
          const sidebarShow = sidebar.classList.contains('show');

          if(event.target.closest('.nav-list-item')){ return; }

          if(!sidebarShow){
            toggleElementClass(navId, 'show');
            setTimeout(() => {
              sidebar.style.transition = "100ms ease-in-out";
              sidebar.style.left = "-1.5rem";
            }, 250);
          }else{
            sidebar.style.left = "0";
            setTimeout(() => {
              sidebar.style.transition = "250ms ease-in-out";
              toggleElementClass(navId, 'show');
            }, 100);
          }
        });
      }
    });

    document.addEventListener('click', (event) => {
      // Check if the click is outside the sidebar and the toggle buttons
      const sidebarShow = sidebar.classList.contains('show');
      if (!sidebar.contains(event.target) && !toggleIds.some(id => document.getElementById(id).contains(event.target)) && sidebarShow) {
        if(sidebarShow){
          sidebar.style.left = "0";
          setTimeout(() => {
            sidebar.style.transition = "250ms ease-in-out";
            toggleElementClass(navId, 'show');
          }, 100);
        }
      }
    });

    document.addEventListener('keydown', (event) => {
      const sidebarShow = sidebar.classList.contains('show');
      if (event.key === 'Escape' && sidebarShow) {
        if (sidebarShow) {
          sidebar.style.left = "0";
          setTimeout(() => {
            sidebar.style.transition = "250ms ease-in-out";
            toggleElementClass(navId, 'show');
          }, 100);
        }
      }
    });
  }
};
showNavbar(['header-toggle', 'sidebar'], 'sidebar');

// SIDE MENU SUB-MENU FUNCTION
const subMenuToggle = document.querySelectorAll(".sub-menu-toggle");
subMenuToggle.forEach(toggle => {
  toggle.addEventListener("click", (event) => {
    // Set aria-expanded to false for all toggles
    subMenuToggle.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        otherToggle.setAttribute("aria-expanded", "false");
        otherToggle.nextElementSibling.setAttribute("aria-expanded", "false");
      }
    });
    // Toggle aria-expanded for the clicked toggle
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    toggle.nextElementSibling.setAttribute("aria-expanded", expanded ? "false" : "true");

    event.preventDefault();
  });
});

// FORM STEPS
const step = document.querySelector(".step");
if(step) {
  const stepItems = step.querySelectorAll(".step-items");
  const btnStep = document.querySelectorAll(".btn-step");
  const prevBtn = btnStep[0];
  const nextBtn = btnStep[btnStep.length - 1];
  const stepLen = stepItems.length;
  let curStep = 0;

  function updateButton() {
    nextBtn.textContent = curStep === stepLen - 1 ? "Submit" : "Next";
    prevBtn.classList.toggle("d-none", curStep === 0);
  }

  function updateStep(newStep) {
    stepItems[curStep].classList.remove("active");
    curStep = newStep;
    stepItems[curStep].classList.add("active");
    updateButton();
  }

  updateButton();
  stepItems[curStep].classList.add("active");

  nextBtn.addEventListener("click", () => {
    if (curStep !== stepLen - 1) updateStep(curStep + 1);
    else nextBtn.setAttribute("type", "submit");
  });

  prevBtn.addEventListener("click", () => {
    if (curStep !== 0) updateStep(curStep - 1);
  });
}

// INPUT WITH IMAGE PREVIEW
const imgPreview = document.querySelectorAll(".input-file-preview");
if(imgPreview) {
  imgPreview.forEach(imgPreview => {
    const input = imgPreview.querySelector("input");

    input.addEventListener("change", () => {
      if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imgPreview.querySelector("div").remove();
          imgPreview.querySelector("img").style.display = "block";
          imgPreview.querySelector("img").setAttribute("src", e.target.result);
          console.log(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    });
  });
}

// MULTI IMAGE UPLOAD
const multipleImagesUpload = document.querySelectorAll(".multiple-images-upload");
if(multipleImagesUpload) {
  multipleImagesUpload.forEach(multiUpload => {
    const addImg = multiUpload.querySelector(".add-image");
    const addFile = addImg.querySelector("input");

    addFile.addEventListener("change", () => {
      if(addFile.files && addFile.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImgWrapper = document.createElement("div");
          const newInput = addFile.cloneNode(true);
          const delBtn = document.createElement("button");
          const inputType = addFile.files[0].type.split('/');

          const createElement = (tag, className = '') => {
            const element = document.createElement(tag);
            if (className) {
              element.className = className;
            }
            return element;
          };

          const createIcon = (type) => {
            const newIcon = createElement('i', 'fi text-xl');
            const iconName = type === 'pdf' ? 'fi-rr-file-pdf' : 'fi-rr-file';
            newIcon.classList.add(iconName);
            return newIcon;
          };

          if (inputType[0] === 'image') {
            const newImg = createElement('img');
            newImg.src = e.target.result;
            newImgWrapper.appendChild(newImg);
          } else {
            newImgWrapper.appendChild(createIcon(inputType[1]));
          }

          newImgWrapper.className = 'images-item';
          delBtn.type = 'button';
          delBtn.className = 'btn btn-del';
          delBtn.innerHTML = "<i class='fi fi-rr-cross-small'></i>";

          newInput.setAttribute('name', 'files[]');
          newImgWrapper.appendChild(newInput);
          newImgWrapper.appendChild(delBtn);
          multiUpload.insertBefore(newImgWrapper, addImg);

          delBtn.addEventListener('click', () => {
            newImgWrapper.remove();
          });
        }
        reader.readAsDataURL(addFile.files[0]);
      }
    });
  });
}

// OPEN REQUEST
const openRequest = document.getElementById('open-request');
if(openRequest) {
  const requestType = document.getElementById('request-type');
  const redeemItem = document.getElementById('redeem-item');
  const requestPoint = document.getElementById('request-point');
  const requestRedeem = document.getElementById('request-redeem');
  const requestFrom = document.getElementById('request-from');
  const requestTo = document.getElementById('request-to');
  const requestDetail = document.getElementById('request-detail');
  const requestPayment = document.getElementById('request-payment');
  const inputPayment = document.getElementById('input-payment');

  function redeemConf(e) {
    redeemItem.classList.toggle('d-none', !e);
    requestRedeem.children[0].selected = e;
    requestRedeem.children[1].hidden = e;
    requestDetail.classList.toggle('d-none', !e);
    requestDetail.querySelector('input').disabled = !e;
  }

  function paymentConf(e) {
    requestPayment.classList.toggle('d-none', !e);
    requestPayment.querySelector('input').disabled = !e;
  }

  function customerConf(e) {
    requestFrom.querySelectorAll('div')[0].textContent = e ? 'From' : 'Customer Name';
    requestTo.classList.toggle('d-none', !e);
    requestTo.querySelector('input').disabled = !e;
    requestTo.querySelector('input').focus();
  }

  function askOfferConf(e) {
    requestPoint.children[1].hidden = !e;
  }
  
  requestType.addEventListener('change', () => {
    redeemConf(requestType.value === 'redeem');
    paymentConf(!(requestType.value === 'transfer' || requestType.value === 'redeem'));
    inputPayment.value = (requestType.value === 'transfer' || requestType.value === 'redeem') ? "" : inputPayment.value;
    customerConf(requestType.value === 'transfer');
    askOfferConf(requestType.value === 'ask' || requestType.value === 'offer');
  });
}

// TOPUP INPUT PRESET
const topUpAmount = document.getElementById('topup-amount');
if (topUpAmount) {
  topUpAmount.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.matches('.preset-amount button')) {
      const value = clickedElement.innerText.trim();
      const presetInput = topUpAmount.querySelector('input');
      
      if (value === 'CUSTOM') {
        presetInput.focus();
        presetInput.setSelectionRange(presetInput.value.length, presetInput.value.length);
      } else {
        presetInput.value = value;
      }
    }
  });
}

// LIMIT MAXLENGTH INPUT NUMBER
function limitInput(element, maxLength) {
  if (element.value.length > maxLength) {
    element.value = element.value.slice(0, maxLength);
  }
}