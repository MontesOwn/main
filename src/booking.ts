import { initializeApp } from "./main";
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import "flatpickr/dist/flatpickr.css";
import type { BookingRequest, BookingWithId, SelectOption } from "./models";
import { Timestamp } from "firebase/firestore";
import { clearMessages, createButton, createMessage, makeElement, createSelect, createListElement, storeMessage } from "./modules/utils";
import { auth } from "./firebase/firebase.js";
import { getUserRole } from "./firebase/authService";
import { deleteBooking, deleteOldBookings, getAllBookings, getBookingsByStatus, getDisabledDates, submitBooking, updateBookingStatus } from "./firebase/firebaseService.js";
import { navigateTo } from "./modules/navigate.js";

const viewBookingSection = document.getElementById("view-bookings") as HTMLElement;
const adminBar = document.getElementById("admin-bar") as HTMLElement;
const bookingForm = document.getElementById("booking-form-element") as HTMLFormElement;
const avalibilityCalendarSection = document.getElementById("avalibility-calendar") as HTMLElement;
const yearsArray = generateYears();
let formView: string = "Guest";
const formContents = document.getElementById("form-contents") as HTMLElement;
const loader = document.getElementById("form-loading") as HTMLElement;

const picker = flatpickr("#date-range-picker", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d"
}) as Instance;

async function refreshBlockedDates() {
    loader.classList.remove("hide");
    formContents.classList.add("hide");
    try {
        if (formView === "Guest") {
            const blockedRanges = await getDisabledDates();
            picker.set("disable", blockedRanges);
            console.log("Date selector updated with blocked dates.");
        } else {
            picker.set("disable", []);
        }
    } catch (error) {
        console.error("Error updating blocked dates:", error);
    }
    loader.classList.add("hide");
    formContents.classList.remove("hide");
}

function generateYears(): any[] {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 4;
    const years: SelectOption[] = [];
    for (let year = currentYear; year <= endYear; year++) {
        const newYearOption: SelectOption = {
            value: year,
            label: `${year}`
        }
        years.push(newYearOption);
    }
    return years;

}

async function loadCalendarMonth() {
    const bookings: BookingWithId[] = await getAllBookings();
    const months: SelectOption[] = [
        { label: "January", value: 0 },
        { label: "February", value: 1 },
        { label: "March", value: 2 },
        { label: "April", value: 3 },
        { label: "May", value: 4 },
        { label: "June", value: 5 },
        { label: "July", value: 6 },
        { label: "August", value: 7 },
        { label: "September", value: 8 },
        { label: "October", value: 9 },
        { label: "November", value: 10 },
        { label: "December", value: 11 }
    ];
    const today = Timestamp.now().toDate();
    let monthDisplayed = today.getMonth();
    let yearDisplayed = today.getFullYear();
    let yearDisplayedIndex = 0;
    const calendarContainer = makeElement("div", "calendar-container", null, null);
    const calendarHeader = makeElement("div", "calendar-header", null, null);
    const previousMonthButton = createButton("", "button", "prev-month-button", "", "chevron_left");
    previousMonthButton.addEventListener('click', () => {
        if (yearDisplayed === yearsArray[0] && monthDisplayed === today.getMonth()) {
            return;
        }
        if (monthDisplayed === 0) {
            monthDisplayed = 11;
            yearDisplayed -= 1;
        } else {
            monthDisplayed -= 1;
        }
        manipulate(bookings);
    });
    calendarHeader.appendChild(previousMonthButton);
    const currentDate = makeElement("div", "current-date", null, null);
    let currentMonthSelect: HTMLSelectElement = createSelect(months, "current-month-select");
    let selctedMonth = currentMonthSelect.options[monthDisplayed];
    selctedMonth.selected = true;
    currentMonthSelect.addEventListener('change', () => {
        monthDisplayed = parseInt(currentMonthSelect.value);
        const isPastMonth = yearDisplayed === today.getFullYear() && monthDisplayed < today.getMonth();
        if (isPastMonth) {
            monthDisplayed = today.getMonth();
            currentMonthSelect.value = monthDisplayed.toString();
        }
        manipulate(bookings);
    });
    currentDate.appendChild(currentMonthSelect);
    let currentYearSelect: HTMLSelectElement = createSelect(yearsArray, "current-year-select");
    let selectedYear = currentYearSelect.options[yearDisplayedIndex];
    selectedYear.selected = true;
    currentYearSelect.addEventListener('change', () => {
        yearDisplayed = parseInt(currentYearSelect.value);
        if (yearDisplayed === today.getFullYear() && monthDisplayed < today.getMonth()) {
            monthDisplayed = today.getMonth();
            currentMonthSelect.value = monthDisplayed.toString();
        }
        manipulate(bookings);
    });
    currentDate.appendChild(currentYearSelect);
    const todayButton = createButton("", "button", "today-button", "", "today");
    todayButton.addEventListener('click', () => {
        monthDisplayed = today.getMonth();
        yearDisplayed = today.getFullYear();
        manipulate(bookings);
    });
    currentDate.appendChild(todayButton);
    calendarHeader.appendChild(currentDate);
    const nextMonthButton = createButton("", "button", "next-month-button", "", "chevron_right");
    nextMonthButton.addEventListener('click', () => {
        if (yearDisplayed === yearsArray[4] && monthDisplayed === 11) {
            return;
        }
        if (monthDisplayed === 11) {
            monthDisplayed = 0;
            yearDisplayed += 1;
        } else {
            monthDisplayed += 1;
        }
        manipulate(bookings);
    });
    calendarHeader.appendChild(nextMonthButton);
    calendarContainer.appendChild(calendarHeader);
    const calendarBody = makeElement("div", "calendar-body", null, null);
    const weekDayHeaders = createListElement(["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"], "ul");
    calendarBody.appendChild(weekDayHeaders);
    const calendarDates = makeElement("ul", "calendar-dates", null, null);
    const manipulate = (bookings: BookingWithId[]) => {
        let dayone = new Date(yearDisplayed, monthDisplayed, 1).getDay();
        let lastdate = new Date(yearDisplayed, monthDisplayed + 1, 0).getDate();
        let monthlastdate = new Date(yearDisplayed, monthDisplayed, 0).getDate();
        let dayend = new Date(yearDisplayed, monthDisplayed, lastdate).getDay();
        const comparisonToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        let lit = "";

        for (let i = dayone; i > 0; i--) {
            lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
        }

        for (let i = 1; i <= lastdate; i++) {
            const currentDate = new Date(yearDisplayed, monthDisplayed, i);
            let statusClass = "bg-green";
            if (currentDate < comparisonToday) {
                statusClass = "bg-grey";
            } else {
                const booking = bookings.find(b => {
                    const start = b.startDate.toDate();
                    const end = b.endDate.toDate();
                    start.setHours(0, 0, 0, 0);
                    end.setHours(23, 59, 59, 999);
                    return currentDate >= start && currentDate <= end;
                });

                if (booking) {
                    if (booking.status === "pending" || booking.status === "approved") {
                        statusClass = "bg-grey";
                    } else if (booking.status === "Owner") {
                        statusClass = "bg-blue";
                    }
                }
            }

            let isToday = (i === today.getDate()
                && monthDisplayed === today.getMonth()
                && yearDisplayed === today.getFullYear()) ? "active" : "";

            lit += `<li class="${isToday} ${statusClass}" data-day="${i}">${i}</li>`;
        }

        for (let i = dayend; i < 6; i++) {
            lit += `<li class="inactive">${i - dayend + 1}</li>`;
        }

        currentMonthSelect.value = monthDisplayed.toString();
        currentYearSelect.value = yearDisplayed.toString();
        calendarDates.innerHTML = lit;
    };
    manipulate(bookings);
    calendarBody.appendChild(calendarDates);
    calendarContainer.appendChild(calendarBody);
    avalibilityCalendarSection.appendChild(calendarContainer);
    const legend = makeElement("div", "calendar-legend", "", null);
    const grey = makeElement("div", null, null, "Unavailable");
    const greyDot = makeElement("span", null, "dot bg-grey", null);
    grey.prepend(greyDot);
    legend.appendChild(grey);
    const green = makeElement("div", null, null, "Available");
    const greenDot = makeElement("span", null, "dot bg-green", null);
    green.prepend(greenDot)
    legend.appendChild(green);
    const blue = makeElement("div", null, null, "Montvilles staying at house");
    const bluedot = makeElement("span", null, "dot bg-blue", null);
    blue.prepend(bluedot);
    legend.appendChild(blue);
    avalibilityCalendarSection.appendChild(legend);
}

async function submitData(formElement: HTMLFormElement) {
    loader.classList.remove("hide");
    formContents.classList.add("hide");
    clearMessages();
    const formData = new FormData(formElement);
    if (picker.selectedDates.length < 2) {
        createMessage("Please select start and end dates", "main-message", "error");
        return;
    }
    let newRequest: BookingRequest = {
        fullName: "",
        email: undefined,
        phoneNumber: undefined,
        comments: formData.get("comments") as string || undefined,
        status: "pending",
        startDate: Timestamp.fromDate(picker.selectedDates[0]),
        endDate: Timestamp.fromDate(picker.selectedDates[1]),
        createdAt: Timestamp.now()
    };
    if (formView === "Guest") {
        const fullName = formData.get("fullName") as string;
        if (!fullName || fullName.trim() === '') {
            createMessage("Please enter your name", "main-message", "error");
            return;
        } else {
            newRequest["fullName"] = fullName;
        }
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        if (!email && !phone) {
            createMessage("Please enter your email or phone number", "main-message", "error");
            return;
        } else if (email.trim() === '' && phone.trim() === '') {
            createMessage("Please enter your email or phone number", "main-message", "error");
            return;
        } else {
            if (email.trim() !== "") {
                newRequest["email"] = email;
            }
            if (phone.trim() !== "") {
                newRequest["phoneNumber"] = phone;
            }
        }
    } else {
        newRequest["fullName"] = "Montville Stay";
        newRequest["status"] = "Owner";
    }
    (Object.keys(newRequest) as (keyof BookingRequest)[]).forEach(key => {
        if (newRequest[key] === undefined) {
            delete newRequest[key];
        }
    });
    console.log("Submitting to Firebase:", newRequest);
    try {
        await submitBooking(newRequest);
        storeMessage("Booking submitted", "main-message", "check_circle");
        bookingForm.reset();
        picker.clear();
        deleteOldBookings();
        navigateTo("/montvilla");
    } catch (error: any) {
        createMessage(error, "main-message", "error");
    }
}

async function handleApprove(currentReservation: BookingWithId) {
    try {
        await updateBookingStatus(currentReservation["id"], { status: 'approved' });
        createMessage(`Approved ${currentReservation["fullName"]}'s booking on ${currentReservation["startDate"].toDate().toLocaleDateString()} - ${currentReservation["endDate"].toDate().toLocaleDateString()}`, "main-message", "check_circle");
        await loadBookingRevervations();
    } catch (error) {
        console.error(error);
        createMessage("Error approving booking. Please try reloading the page", "main-message", "error");
    }
}

async function handleDelete(currentReservation: BookingWithId) {
    try {
        await deleteBooking(currentReservation["id"]);
        createMessage(`Deleted ${currentReservation["fullName"]}'s booking on ${currentReservation["startDate"].toDate().toLocaleDateString()} - ${currentReservation["endDate"].toDate().toLocaleDateString()}`, "main-message", "delete");
        await loadBookingRevervations();
    } catch (error) {
        console.log(error);
        createMessage("Error deleting booking. Please try reloading the page", "main-message", "error");
    }
}

async function toggleFormElements() {
    const guestFields = document.getElementById("guest-only-fields") as HTMLDivElement;
    const formTitle = document.getElementById("form-title") as HTMLHeadingElement;
    await refreshBlockedDates();
    if (formView === "Montville") {
        guestFields.classList.add("hide");
        formTitle.textContent = "Book Montville Stay";
        bookingForm.reset();
        picker.clear();
    } else {
        guestFields.classList.remove("hide");
        formTitle.textContent = "Book your stay";
    }
}

function createBookingsDiv(bookingArray: BookingWithId[], sectionId: string, headingText: string) {
    const div = makeElement("div", sectionId, "booking-block", null);

    if (bookingArray.length === 0) {
        const headingH2 = makeElement("h2", null, null, `No ${headingText}`);
        div.appendChild(headingH2);
    } else {
        let expanded = false;
        const bookingsSection = bookingArray.reduce((acc: HTMLElement, currentBooking: BookingWithId) => {
            const nextArticle = makeElement("article", currentBooking["id"], "booking-article", null);
            if (sectionId !== "owner-bookings") {
                const nameP = makeElement("p", null, null, currentBooking["fullName"]);
                nameP.prepend(makeElement("b", null, null, "Name: "));
                nextArticle.appendChild(nameP);
            }
            const startDateP = makeElement("p", null, null, `${currentBooking["startDate"].toDate().toLocaleDateString()}`);
            startDateP.prepend(makeElement("b", null, null, "Start Date: "))
            nextArticle.appendChild(startDateP);
            const endDate = makeElement("p", null, null, `${currentBooking["endDate"].toDate().toLocaleDateString()}`);
            endDate.prepend(makeElement("b", null, null, "End Date: "));
            nextArticle.appendChild(endDate);
            if (currentBooking.email) {
                const emailP = makeElement("p", null, null, currentBooking["email"]);
                emailP.prepend(makeElement("b", null, null, "Email: "));
                nextArticle.appendChild(emailP);
            }
            if (currentBooking["phoneNumber"]) {
                const phoneP = makeElement("p", null, null, currentBooking["phoneNumber"]);
                phoneP.prepend(makeElement("b", null, null, "Phone Number: "));
                nextArticle.appendChild(phoneP);
            }
            if (currentBooking["comments"]) {
                const commentsP = makeElement("p", null, null, currentBooking["comments"]);
                commentsP.prepend(makeElement("b", null, null, "Comments: "));
                nextArticle.appendChild(commentsP);
            }
            const requestedP = makeElement("p", null, null, `${currentBooking["createdAt"].toDate().toLocaleDateString()}`);
            requestedP.prepend(makeElement("b", null, null, "Requested On: "));
            nextArticle.appendChild(requestedP);
            const buttonRow = makeElement("div", null, "button-row", null);
            if (sectionId === "pending-bookings") {
                const approveBtn = createButton("Approve", "button", "", "red-button", "check");
                approveBtn.addEventListener("click", () => handleApprove(currentBooking));
                buttonRow.appendChild(approveBtn);
            }
            const deleteBtn = createButton("Delete", "button", "", "red-button", "delete");
            deleteBtn.addEventListener("click", () => handleDelete(currentBooking));
            buttonRow.appendChild(deleteBtn);
            nextArticle.appendChild(buttonRow);
            acc.appendChild(nextArticle);
            return acc;
        }, makeElement("section", sectionId, "bookings-section hide", null));
        const divHeading = makeElement("div", null, "pointer", null);
        const headingH2 = makeElement("h2", null, null, `${headingText}: ${bookingArray.length}`);
        divHeading.appendChild(headingH2);
        const expandIcon = makeElement("p", null, "material-symbols-outlined", "expand_circle_down")
        divHeading.addEventListener("click", () => {
            if (expanded === false) {
                expanded = true;
                expandIcon.textContent = "expand_circle_up";
                bookingsSection.classList.remove("hide");
            } else {
                expanded = false;
                expandIcon.textContent = "expand_circle_down"
                bookingsSection.classList.add("hide");
            }
        });
        divHeading.appendChild(expandIcon);
        div.appendChild(divHeading);

        div.appendChild(bookingsSection);
    }
    return div;
}

async function loadBookingRevervations() {
    const bookingsContent = document.getElementById("bookings-content") as HTMLElement;
    const bookingsLoading = document.getElementById("bookings-loading") as HTMLElement;
    bookingsContent.classList.add("hide");
    bookingsLoading.classList.remove("hide");
    bookingsContent.innerHTML = '';
    const pendingReservations = await getBookingsByStatus("pending");
    const approvedReservations = await getBookingsByStatus("approved");
    const ownerStays = await getBookingsByStatus("Owner");
    const pendingDiv = createBookingsDiv(pendingReservations, "pending-bookings", "Pending Bookings");
    bookingsContent.appendChild(pendingDiv);
    const approvedDiv = createBookingsDiv(approvedReservations, "approved-bookings", "Approved Bookings");
    bookingsContent.appendChild(approvedDiv);
    const ownerDiv = createBookingsDiv(ownerStays, "owner-bookings", "Montville Bookings");
    bookingsContent.appendChild(ownerDiv);
    bookingsLoading.classList.add("hide");
    bookingsContent.classList.remove("hide");
}


initializeApp("Montvilla", "Calendar").then(async () => {
    await loadCalendarMonth();
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            let userRole = await getUserRole(user.uid);
            if (userRole === "admin") {
                toggleFormElements();
                const guestButton = createButton("Guest Booking Form", "button", "", "red-button");
                guestButton.addEventListener('click', () => {
                    viewBookingSection.classList.add("hide");
                    bookingForm.classList.remove("hide");
                    formView = "Guest";
                    toggleFormElements();
                });
                adminBar.appendChild(guestButton);
                const montvilleButton = createButton("Montville Booking Form", "button", "", "red-button");
                montvilleButton.addEventListener('click', () => {
                    viewBookingSection.classList.add("hide");
                    bookingForm.classList.remove("hide");
                    formView = "Montville";
                    toggleFormElements();
                });
                adminBar.appendChild(montvilleButton);
                const viewBookingButton = createButton("View Bookings", "button", "", "red-button");
                viewBookingButton.addEventListener('click', async () => {
                    bookingForm.classList.add("hide");
                    viewBookingSection.classList.remove("hide");
                    await loadBookingRevervations();
                });
                adminBar.appendChild(viewBookingButton);
            } else {
                await refreshBlockedDates();
                bookingForm.classList.remove("hide");
                loader.classList.add("hide");
            }
        } else {
            await refreshBlockedDates();
            bookingForm.classList.remove("hide");
            loader.classList.add("hide");
        }
    });

    bookingForm.addEventListener("reset", () => {
        picker.clear();
    });
    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await submitData(bookingForm);
    })
});