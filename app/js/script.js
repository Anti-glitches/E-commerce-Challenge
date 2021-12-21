const menuLogo = document.querySelector(".menuLogo");
const mobileMenu = document.querySelector(".mobileMenu");
const checkoutIcon = document.querySelector(".checkoutIcon");
const checkout = document.querySelector(".checkout");
const checkoutIconBadge = document.querySelector(".badge");
const checkoutButton = document.querySelector(".checkout__button");

const addToCartButton = document.querySelector(".product__addToCart");

const mainImage = document.querySelector(".product__image__main");
const prevImg = document.querySelector(".prevImg");
const nextImg = document.querySelector(".nextImg");
const imageThumbnail = document.querySelectorAll(
	".product__image__thumbnail img"
);

window.addEventListener("mouseup", function (event) {
	if (!checkout.contains(event.target)) {
		checkout.style.display = "none";
	}

	if (!mobileMenu.contains(event.target) && !menuLogo.contains(event.target)) {
		menuLogo.attributes["src"].value = "images/icon-menu.svg";
		mobileMenu.classList.remove("open");
		document.querySelector("body").style.overflow = "visible";

		setTimeout(() => {
			mobileMenu.firstElementChild.style.display = "none";
		}, 300);
	}
});

menuLogo.addEventListener("click", () => {
	if (menuLogo.attributes["src"].value == "images/icon-close.svg") {
		menuLogo.attributes["src"].value = "images/icon-menu.svg";
		mobileMenu.classList.remove("open");
		document.querySelector("body").style.overflow = "visible";

		setTimeout(() => {
			mobileMenu.firstElementChild.style.display = "none";
		}, 300);
	} else {
		menuLogo.attributes["src"].value = "images/icon-close.svg";
		mobileMenu.classList.add("open");
		document.querySelector("body").style.overflow = "hidden";

		setTimeout(() => {
			mobileMenu.firstElementChild.style.display = "block";
		}, 300);
	}
	// console.log(headerToggle.firstElementChild.attributes["src"].value);

	// headerToggle.lastElementChild.classList.add("open");
});

checkoutIcon.addEventListener("click", () => {
	if (checkout.style.display === "grid") {
		checkout.style.display = "none";
	} else {
		checkout.style.display = "grid";
	}
});

function checkoutItemCount() {
	checkoutIconBadge.innerHTML = checkout.childElementCount - 3;

	if (checkoutIconBadge.innerHTML == 0) {
		document.querySelector(".checkout__empty").classList.remove("hidden");
		checkoutButton.classList.add("hidden");
	} else {
		document.querySelector(".checkout__empty").classList.add("hidden");
		checkoutButton.classList.remove("hidden");
	}
}

checkoutItemCount();

function deleteItems() {
	const checkoutDeleteItems = document.querySelectorAll(".deleteIcon");

	checkoutDeleteItems.forEach((element) => {
		element.addEventListener("click", () => {
			element.parentElement.remove();
			checkoutItemCount();
		});
	});
}
deleteItems();

addToCartButton.addEventListener("click", () => {
	let number = document.querySelector(".number");
	let price = document.querySelector(".product__price__discounted");

	let totalPrice =
		parseInt(number.innerHTML) * parseFloat(price.innerHTML.slice(1));

	let checkoutItem = document.createElement("div");
	checkoutItem.classList.add("checkout__item");

	checkoutItem.innerHTML = `<img
		class="productImage"
		src="/images/image-product-1-thumbnail.jpg"
		alt=""
	/>
	<div class="productInfo">
		<p>Fall Limited Edition Sneakers</p>
		<p>
			<span class="productPrice">${price.innerHTML}</span>
			x
			<span class="productAmount">${number.innerHTML}</span>
			<span class="productTotalPrice">$${totalPrice.toFixed(2)}</span>
		</p>
	</div>
	<img class="deleteIcon" src="/images/icon-delete.svg" alt="" />`;

	// checkout.appendChild(checkoutItem);
	checkoutButton.before(checkoutItem);
	checkoutItemCount();
	deleteItems();
});

function mobilePrevNextImg() {
	let imgNumber = 1;

	prevImg.addEventListener("click", () => {
		if (imgNumber == 1) {
			imgNumber = 5;
		}

		imgNumber--;
		mainImage.attributes["src"].value =
			mainImage.attributes["src"].value.slice(0, -5) + imgNumber + ".jpg";
	});

	nextImg.addEventListener("click", () => {
		if (imgNumber == 4) {
			imgNumber = 0;
		}

		imgNumber++;

		mainImage.attributes["src"].value =
			mainImage.attributes["src"].value.slice(0, -5) + imgNumber + ".jpg";
	});
}

mobilePrevNextImg();

imageThumbnail.forEach((element) => {
	element.addEventListener("click", () => {
		let thumbnail = element.attributes["src"].value;

		mainImage.attributes["src"].value = thumbnail.slice(0, -14) + ".jpg";

		if (!element.classList.contains("clicked")) {
			imageThumbnail.forEach((toRemove) => {
				toRemove.classList.remove("clicked");
			});

			element.classList.add("clicked");
		}
	});
});

function decrement() {
	const number = document.querySelector(".number");

	if (parseInt(number.innerHTML) > 1) {
		number.innerHTML = parseInt(number.innerHTML) - 1;
	}
}

function increment() {
	const number = document.querySelector(".number");

	number.innerHTML = parseInt(number.innerHTML) + 1;
}
