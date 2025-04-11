import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../Slices/Auth";
import { studentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { EmtingCartAfterBuying } from "./CartAPI";
import { useSelector } from "react-redux";
import { setUser } from "../../Slices/Profile";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// use To load Razorpay Script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  CoursesIds,
  totalAmount,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    //load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    //initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { CoursesIds, totalAmount },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("fuck")
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    // console.log("PRINTING orderResponse", orderResponse);

    // console.log(
    //   process.env.REACT_APP_RAZORPAY_KEY,
    //   orderResponse.data.message.currency,
    //   orderResponse.data.message.amount,
    //   orderResponse.data.message.id,
    //   userDetails.firstName,
    //   userDetails.lastName,
    //   userDetails.email
    // );
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: " KNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        //send successful wala mail
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token
        );
        //verifyPayment
        verifyPayment(
          { ...response, CoursesIds },
          token,
          navigate,
          dispatch,
          userDetails
        );
      },
    };

    //miss hogya tha
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch, user) {
  const toastId = toast.loading("Verifying Payment...");

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    dispatch(setUser(response.data.data));
    localStorage.setItem("user", JSON.stringify(response.data.data));

    // console.log(response.data.data);

    toast.success("Payment successful");

    await EmtingCartAfterBuying(user._id, token);

    navigate("/EnrolledCourses/active-Courses");
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR: ", error);
    toast.error("Could not verify payment");
  } finally {
    toast.dismiss(toastId);
  }
}
