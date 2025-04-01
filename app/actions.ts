"use server";

import { CartItem } from "@/lib/store";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require("nodemailer");

type Config = {
  html: string;
  subject: string;
  to: string;
};
type BillingLogicFormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  totalPrice: number;
  selectedState: string;
};
export async function sendMail(config: Config) {
  const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      // Relace this with padilifestyle email address
      user: "davidsonletam@gmail.com",
      pass: "ijhw hfar bfut iepy",
    },
  });
  const mailOptions = {
    // Relace this with padilifestyle email address
    from: `GOAT COLLECTION`,
    to: config.to,
    subject: config.subject,
    html: config.html,
  };

  const result = await transport.sendMail(mailOptions);
  console.log(result);
}
export async function subscribeToNewsletter(formData: { email: string }) {
  const supabase = getSupabaseBrowserClient();

  //   1. Create email
  const { error: newsletterEmailsErrors } = await supabase
    .from("newsletter_emails")
    .insert({
      email: formData.email,
    });

  if (newsletterEmailsErrors) {
    toast.error("Email already exists.");
    return;
  }
  await sendMail({
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 40px auto; max-width: 600px; background-color: white; padding: 20px; border-radius: 10px;">
      <!-- Logo -->
      <tr>
        <td align="center" style="padding-bottom: 20px;">
          <div className="bg-white items-center  flex  border border-black px-4">
            <h2 className="text-2xl text-black font-semibold">GOAT</h2>
          </div>
        </td>
      </tr>
      
      <!-- Welcome Banner -->
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: black; padding: 20px;">
            <tr>
              <td align="center">
                <h3 style="color: white; font-size: 24px; text-align: center; font-family: 'Afacad', Arial, sans-serif;">🎉 Thank You for Subscribing 🎉</h3>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Message Content -->
      <tr>
        <td style="padding: 20px;">
          <h2 style="font-family: 'Afacad', Arial, sans-serif;">Dear Friend,</h2>
          <p style="font-size: 16px; line-height: 1.5;">Thank you for subscribing to Goat! 🎉 We're so excited to have you join our community.</p>
          <p style="font-size: 16px; line-height: 1.5;">Expect goat updates just for you!</p>
          <p style="font-size: 16px;">Stay strong,<br><strong>Goat Nation 🐐</strong></p>
        </td>
      </tr>

      <!-- Shop Now Button -->
      <tr>
        <td align="center" style="padding-top: 20px;">
          <a href="https://Padilifestyle.com" target="_blank" 
             style="background-color: black; color: white; padding: 15px 30px; font-size: 16px; font-weight: bold; text-decoration: none; display: inline-block;">
            Shop Now
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>


`,
    // user_email
    to: formData.email,
    subject: "Welcome to GOAT",
  });
}

export const billingLogic = async (
  formData: BillingLogicFormData,
  items: CartItem[],
  reference: string
) => {
  const supabase = getSupabaseBrowserClient();
  //   1. Create customer
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    })
    .select("id")
    .single();

  if (customerError) throw new Error(customerError.message);

  // 2. Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customer.id,
      total_amount: formData.totalPrice,
      status: "pending",
      address: formData.address,
      phone: formData.phone,
      state: formData.selectedState,
      city: formData.city,
      email: formData.email,
      reference: reference,
    })
    .select("id")
    .single();

  if (orderError) throw new Error(orderError.message);

  // 3. Create order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product.id,
    product_name: item.product.name,
    size: item.size,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (orderItemsError) throw new Error(orderItemsError.message);

  const orderSummaryMail = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        margin: 40px auto 0px auto;
        max-width: 600px;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <!-- Logo -->
      <tr>
        <td align="center" style="padding-bottom: 20px">
          <div className="bg-white items-center  flex  border border-black px-4">
            <h2 className="text-2xl text-black font-semibold">GOAT</h2>
          </div>
        </td>
      </tr>

      <!-- Welcome Banner -->
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="background-color: black; padding: 20px"
          >
            <tr>
              <td align="center">
                <h3
                  style="
                    color: white;
                    font-size: 24px;
                    text-align: center;
                    font-family: 'Afacad', Arial, sans-serif;
                  "
                >
                  Order Summary 🎉
                </h3>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px">
          <p style="font-size: 16px; line-height: 1.5">
            Order ID: <strong>${order.id}</strong>
          </p>
        </td>
      </tr>
      <!-- Message Content -->
      <tr>
        <td>
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              margin: 0px auto;
              max-width: 600px;
              background-color: white;
              padding: 20px;
              border-radius: 10px;
            "
          >
            <tr>
              <th style="text-align: left; padding: 0px 20px">Item</th>
              <th style="text-align: left; padding: 0px 20px">Size</th>
              <th style="text-align: left; padding: 0px 20px">Quantity</th>
              <th style="text-align: right; padding: 0px 20px">Price</th>
            </tr>
            <tbody>
              ${items.map(
                (item) => `
              <tr>
                <td style="padding: 20px">
                  <p style="font-size: 16px; line-height: 1.5">${item.product.name}</p>
                </td>
                <td style="padding: 20px">
                  <p style="font-size: 16px; line-height: 1.5">${item.size}</p>
                </td>
                <td style="padding: 20px">
                  <p style="font-size: 16px; line-height: 1.5">${item.quantity}</p>
                </td>
                <td style="padding: 20px">
                  <p
                    style="font-size: 16px; line-height: 1.5; text-align: right"
                  >
                    N${item.product.price}
                  </p>
                </td>
              </tr>
    `
              )}
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <p
            style="
              font-size: 16px;
              line-height: 1.5;
              font-size: 24px;
              text-align: center;
            "
          >
            <strong style="font-size: 24px">Total:</strong> ${
              formData.totalPrice
            }
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p
            style="
              font-size: 16px;
              line-height: 1.5;
              font-size: 12px;
              text-align: center;
            "
          >
            Thanks for shopping with us
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;

  await sendMail({
    html: orderSummaryMail,
    // user_email
    to: formData.email,
    subject: "Order placed successfully",
  });
};

// export const checkCart = (totalItems: number) => {
//   if (totalItems === 0) {
//     toast.message("Cart is empty");
//     return true;
//   }
//   return false;
// };
